import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { loadDashboardData } from "./store/slices/dashboardSlice";
import { toggleTheme } from "./store/slices/themeSlice";
import KPIGrid from "./components/KPIGrid/KPIGrid";
import ChartsGrid from "./components/Charts/ChartsGrid";
import DataTable from "./components/DataTable/DataTable";

type Page = "Dashboard" | "Analytics" | "Reports" | "Customers" | "Orders" | "Revenue" | "Goals" | "Settings";

const NAV_GROUPS = [
  { section: "Main", items: [
    { icon: "⊞", label: "Dashboard" as Page },
    { icon: "📊", label: "Analytics" as Page, badge: 3 },
    { icon: "📄", label: "Reports" as Page },
    { icon: "👥", label: "Customers" as Page },
  ]},
  { section: "Sales", items: [
    { icon: "🛒", label: "Orders" as Page },
    { icon: "💵", label: "Revenue" as Page },
    { icon: "🎯", label: "Goals" as Page },
  ]},
  { section: "System", items: [
    { icon: "⚙️", label: "Settings" as Page },
  ]},
];

// Icons shown in the mobile bottom bar (most-used pages)
const BOTTOM_NAV: { icon: string; label: Page }[] = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "📊", label: "Analytics" },
  { icon: "📄", label: "Reports" },
  { icon: "👥", label: "Customers" },
  { icon: "⚙️", label: "Settings" },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [moreOpen, setMoreOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { dispatch(loadDashboardData()); }, [dispatch]);
  useEffect(() => { setMoreOpen(false); }, [activePage]);

  const isDark = mode === "dark";

  const t = isDark ? {
    bgPage:    "#0F1629",
    bgSidebar: "#111827",
    bgCard:    "#1E2A3B",
    bgInput:   "#162032",
    border:    "#2A3A50",
    textHead:  "#FFFFFF",
    textMain:  "#E2E8F0",
    textMuted: "#8B9EC7",
  } : {
    bgPage:    "#F1F5F9",
    bgSidebar: "#FFFFFF",
    bgCard:    "#FFFFFF",
    bgInput:   "#F8FAFC",
    border:    "#E2E8F0",
    textHead:  "#0F172A",
    textMain:  "#1E293B",
    textMuted: "#64748B",
  };

  const renderPage = () => {
    if (activePage === "Dashboard") return (
      <>
        <SectionLabel t={t}>KPI Overview</SectionLabel>
        <KPIGrid />
        <SectionLabel t={t}>Analytics</SectionLabel>
        <ChartsGrid />
        <SectionLabel t={t}>Customer Report</SectionLabel>
        <DataTable />
      </>
    );
    if (activePage === "Analytics") return (
      <PageShell title="Analytics" desc="Deep-dive performance metrics" t={t}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
          {[
            { label:"Page Views",      value:"1.24M",  delta:"+22%",  up:true  },
            { label:"Bounce Rate",     value:"38.4%",  delta:"-4.1%", up:false },
            { label:"Avg. Session",    value:"4m 12s", delta:"+0.8%", up:true  },
            { label:"Return Visitors", value:"61.2%",  delta:"+7.3%", up:true  },
          ].map(s => (
            <div key={s.label} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:16 }}>
              <p style={{ fontSize:11, color:t.textMuted, marginBottom:6 }}>{s.label}</p>
              <p style={{ fontSize:20, fontWeight:500, color:t.textHead, fontFamily:"monospace", marginBottom:4 }}>{s.value}</p>
              <p style={{ fontSize:11, color: s.up ? "#10B981" : "#EF4444" }}>{s.delta} vs last period</p>
            </div>
          ))}
        </div>
      </PageShell>
    );
    if (activePage === "Reports") return (
      <PageShell title="Reports" desc="Generated reports ready for download" t={t}>
        {[
          { name:"Q2 2026 Revenue Report",       date:"Jun 10, 2026", size:"2.4 MB", type:"PDF"  },
          { name:"Customer Growth Analysis",     date:"Jun 8, 2026",  size:"1.1 MB", type:"XLSX" },
          { name:"Sales Performance Summary",    date:"Jun 5, 2026",  size:"890 KB", type:"PDF"  },
          { name:"Category Distribution Report", date:"Jun 1, 2026",  size:"1.8 MB", type:"PDF"  },
        ].map(r => (
          <div key={r.name} style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:8, background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:"14px 16px", marginBottom:10 }}>
            <div>
              <p style={{ fontSize:13, fontWeight:500, color:t.textHead, marginBottom:3 }}>{r.name}</p>
              <p style={{ fontSize:11, color:t.textMuted }}>{r.date} · {r.size}</p>
            </div>
            <span style={{ background:"rgba(59,130,246,0.15)", color:"#60A5FA", fontSize:10, padding:"3px 10px", borderRadius:99 }}>{r.type}</span>
          </div>
        ))}
      </PageShell>
    );
    if (activePage === "Customers") return (
      <PageShell title="Customers" desc="Customer overview and segments" t={t}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:14 }}>
          {[
            { label:"Total Customers", value:"24,190", color:"#3B82F6" },
            { label:"Active",          value:"18,340", color:"#10B981" },
            { label:"New This Month",  value:"3,400",  color:"#F59E0B" },
            { label:"Churned",         value:"210",    color:"#EF4444" },
          ].map(s => (
            <div key={s.label} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderTop:`2px solid ${s.color}`, borderRadius:8, padding:16 }}>
              <p style={{ fontSize:11, color:t.textMuted, marginBottom:6 }}>{s.label}</p>
              <p style={{ fontSize:22, fontWeight:500, color:t.textHead, fontFamily:"monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </PageShell>
    );
    if (activePage === "Orders") return (
      <PageShell title="Orders" desc="Manage and track all customer orders" t={t}>
        {[
          { id:"#ORD-8821", customer:"Hina Javed",    amount:"$4,200", status:"Delivered",  color:"#10B981" },
          { id:"#ORD-8820", customer:"Faisal Qureshi", amount:"$7,800", status:"Processing", color:"#F59E0B" },
          { id:"#ORD-8819", customer:"Saira Khan",     amount:"$2,100", status:"Delivered",  color:"#10B981" },
          { id:"#ORD-8818", customer:"Omar Farooq",    amount:"$930",   status:"Pending",    color:"#8B5CF6" },
          { id:"#ORD-8817", customer:"Ahsan Butt",     amount:"$5,600", status:"Delivered",  color:"#10B981" },
        ].map(o => (
          <div key={o.id} style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:10, background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:"12px 16px", marginBottom:10 }}>
            <span style={{ fontSize:12, fontFamily:"monospace", color:t.textMuted }}>{o.id}</span>
            <span style={{ fontSize:13, fontWeight:500, color:t.textHead, flex:1, minWidth:120 }}>{o.customer}</span>
            <span style={{ fontSize:13, fontFamily:"monospace", color:t.textHead }}>{o.amount}</span>
            <span style={{ fontSize:10, padding:"3px 10px", borderRadius:99, background:`${o.color}22`, color:o.color }}>{o.status}</span>
          </div>
        ))}
      </PageShell>
    );
    if (activePage === "Revenue") return (
      <PageShell title="Revenue" desc="Revenue streams and forecasts" t={t}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
          {[
            { label:"This Month",   value:"$4.82M", delta:"+18.4%" },
            { label:"Last Month",   value:"$4.07M", delta:"+12.1%" },
            { label:"This Quarter", value:"$13.4M", delta:"+21.3%" },
            { label:"Forecast",     value:"$5.1M",  delta:"+5.8%"  },
          ].map(s => (
            <div key={s.label} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:16 }}>
              <p style={{ fontSize:11, color:t.textMuted, marginBottom:6 }}>{s.label}</p>
              <p style={{ fontSize:20, fontWeight:500, color:t.textHead, fontFamily:"monospace", marginBottom:4 }}>{s.value}</p>
              <p style={{ fontSize:11, color:"#10B981" }}>{s.delta} vs last period</p>
            </div>
          ))}
        </div>
      </PageShell>
    );
    if (activePage === "Goals") return (
      <PageShell title="Goals" desc="Quarterly business goals and progress" t={t}>
        {[
          { goal:"Revenue Target $5M",   progress:82, color:"#3B82F6" },
          { goal:"New Customers 30,000", progress:67, color:"#10B981" },
          { goal:"Conversion Rate 8%",   progress:55, color:"#F59E0B" },
          { goal:"NPS Score 70+",        progress:90, color:"#8B5CF6" },
        ].map(g => (
          <div key={g.goal} style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:16, marginBottom:10 }}>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:6, marginBottom:8 }}>
              <span style={{ fontSize:13, fontWeight:500, color:t.textHead }}>{g.goal}</span>
              <span style={{ fontSize:12, color:g.color, fontFamily:"monospace" }}>{g.progress}%</span>
            </div>
            <div style={{ background:t.bgInput, borderRadius:99, height:6 }}>
              <div style={{ width:`${g.progress}%`, background:g.color, height:6, borderRadius:99 }} />
            </div>
          </div>
        ))}
      </PageShell>
    );
    if (activePage === "Settings") return (
      <PageShell title="Settings" desc="Account and application preferences" t={t}>
        <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:8, padding:20 }}>
          {[
            { label:"Dark Mode",           desc:"Toggle light/dark theme" },
            { label:"Email Notifications", desc:"Receive weekly reports" },
            { label:"Data Refresh",        desc:"Auto-refresh every 5 minutes" },
          ].map((s, i) => (
            <div key={s.label} style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:8, paddingBottom: i < 2 ? 16 : 0, marginBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? `1px solid ${t.border}` : "none" }}>
              <div>
                <p style={{ fontSize:13, fontWeight:500, color:t.textHead, margin:0 }}>{s.label}</p>
                <p style={{ fontSize:11, color:t.textMuted, margin:0 }}>{s.desc}</p>
              </div>
              <div style={{ width:36, height:20, borderRadius:99, background: isDark && i===0 ? "#3B82F6" : t.bgInput, border:`1px solid ${t.border}`, cursor:"pointer" }} />
            </div>
          ))}
        </div>
      </PageShell>
    );
    return null;
  };

  return (
    <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", height:"100vh", overflow:"hidden", background:t.bgPage, color:t.textMain, fontFamily:"system-ui,sans-serif", transition:"background 0.25s, color 0.25s", position:"relative" }}>

      {/* DESKTOP SIDEBAR (hidden on mobile) */}
      {!isMobile && (
        <aside style={{ width:210, flexShrink:0, background:t.bgSidebar, borderRight:`1px solid ${t.border}`, display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${t.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:6, background:"#3B82F6", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:500 }}>T</div>
              <div>
                <p style={{ fontSize:14, fontWeight:500, color:t.textHead, margin:0 }}>Teyzix Core</p>
                <p style={{ fontSize:10, color:t.textMuted, margin:0 }}>Analytics Suite</p>
              </div>
            </div>
          </div>

          <nav style={{ flex:1, padding:"10px 0", overflowY:"auto" }}>
            {NAV_GROUPS.map(group => (
              <div key={group.section}>
                <p style={{ padding:"8px 16px 3px", fontSize:10, textTransform:"uppercase", letterSpacing:"0.06em", color:t.textMuted, margin:0 }}>
                  {group.section}
                </p>
                {group.items.map(item => {
                  const isActive = activePage === item.label;
                  return (
                    <button key={item.label} onClick={() => setActivePage(item.label)}
                      style={{ width:"calc(100% - 16px)", margin:"1px 8px", display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:6, border:"none", cursor:"pointer", fontSize:12.5, fontFamily:"inherit", background: isActive ? "rgba(59,130,246,0.2)" : "transparent", color: isActive ? "#93C5FD" : t.textMuted, transition:"all 0.15s" }}
                    >
                      <span style={{ fontSize:15, width:20, textAlign:"center" }}>{item.icon}</span>
                      <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                      {"badge" in item && item.badge && (
                        <span style={{ background:"#3B82F6", color:"#fff", fontSize:10, padding:"1px 6px", borderRadius:99 }}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div style={{ padding:12, borderTop:`1px solid ${t.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#3B82F6,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:500 }}>MA</div>
              <div>
                <p style={{ fontSize:12, fontWeight:500, color:t.textHead, margin:0 }}>M. Ahmed</p>
                <p style={{ fontSize:10, color:t.textMuted, margin:0 }}>Admin</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* MAIN COLUMN */}
      <div style={{ display:"flex", flexDirection:"column", flex:1, minWidth:0, overflow:"hidden" }}>

        <header style={{ display:"flex", alignItems:"center", gap:10, padding: isMobile ? "10px 12px" : "10px 20px", borderBottom:`1px solid ${t.border}`, background:t.bgSidebar, flexShrink:0, flexWrap:"wrap" }}>
          {isMobile && (
            <div style={{ width:24, height:24, borderRadius:6, background:"#3B82F6", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:500 }}>T</div>
          )}
          <div style={{ flex:1, minWidth:120 }}>
            <h1 style={{ fontSize: isMobile ? 13 : 15, fontWeight:500, color:t.textHead, margin:0 }}>
              {isMobile ? activePage : "Business Intelligence Overview"}
            </h1>
            {!isMobile && <p style={{ fontSize:11, color:t.textMuted, margin:0 }}>Last sync: 2 min ago</p>}
          </div>
          {!isMobile && (
            <span style={{ fontSize:11, color:t.textMuted, background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:6, padding:"4px 12px" }}>
              📅 {new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"})}
            </span>
          )}
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{ display:"flex", alignItems:"center", gap:6, background: isDark ? "#1E3A5F" : "#DBEAFE", border:`1px solid ${isDark ? "#3B82F6" : "#93C5FD"}`, borderRadius:6, padding: isMobile ? "6px 10px" : "6px 14px", fontSize:12, color: isDark ? "#93C5FD" : "#1D4ED8", cursor:"pointer", fontFamily:"inherit", fontWeight:500, whiteSpace:"nowrap" }}
          >
            {isDark ? "☀️" : "🌙"}{!isMobile && (isDark ? " Light Mode" : " Dark Mode")}
          </button>
        </header>

        <main style={{ flex:1, overflowY:"auto", padding: isMobile ? "12px" : "16px 20px", paddingBottom: isMobile ? 80 : undefined }}>
          {renderPage()}
        </main>
      </div>

      {/* MOBILE BOTTOM NAV BAR */}
      {isMobile && (
        <>
          {moreOpen && (
            <>
              <div onClick={() => setMoreOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:60 }} />
              <div style={{ position:"fixed", left:0, right:0, bottom:60, background:t.bgSidebar, borderTop:`1px solid ${t.border}`, borderRadius:"12px 12px 0 0", zIndex:61, padding:"12px 8px", maxHeight:"60vh", overflowY:"auto", boxShadow:"0 -4px 20px rgba(0,0,0,0.3)" }}>
                <p style={{ textAlign:"center", color:t.textMuted, fontSize:11, marginBottom:8 }}>All Pages</p>
                {NAV_GROUPS.map(group => (
                  <div key={group.section}>
                    <p style={{ padding:"8px 16px 3px", fontSize:10, textTransform:"uppercase", letterSpacing:"0.06em", color:t.textMuted, margin:0 }}>
                      {group.section}
                    </p>
                    {group.items.map(item => {
                      const isActive = activePage === item.label;
                      return (
                        <button key={item.label} onClick={() => setActivePage(item.label)}
                          style={{ width:"calc(100% - 16px)", margin:"1px 8px", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontFamily:"inherit", background: isActive ? "rgba(59,130,246,0.2)" : "transparent", color: isActive ? "#93C5FD" : t.textMain }}
                        >
                          <span style={{ fontSize:17 }}>{item.icon}</span>
                          <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                          {"badge" in item && item.badge && (
                            <span style={{ background:"#3B82F6", color:"#fff", fontSize:10, padding:"1px 6px", borderRadius:99 }}>{item.badge}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}

          <nav style={{ position:"fixed", left:0, right:0, bottom:0, height:60, background:t.bgSidebar, borderTop:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"space-around", zIndex:55 }}>
            {BOTTOM_NAV.map(item => {
              const isActive = activePage === item.label && !moreOpen;
              return (
                <button key={item.label} onClick={() => { setActivePage(item.label); setMoreOpen(false); }}
                  style={{ background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:2, color: isActive ? "#3B82F6" : t.textMuted, fontSize:10, cursor:"pointer", flex:1, fontFamily:"inherit" }}
                >
                  <span style={{ fontSize:18 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button onClick={() => setMoreOpen(o => !o)}
              style={{ background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:2, color: moreOpen ? "#3B82F6" : t.textMuted, fontSize:10, cursor:"pointer", flex:1, fontFamily:"inherit" }}
            >
              <span style={{ fontSize:18 }}>☰</span>
              <span>More</span>
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

const SectionLabel: React.FC<{ children: React.ReactNode; t: any }> = ({ children, t }) => (
  <p style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.06em", color:t.textMuted, marginBottom:10, marginTop:4 }}>{children}</p>
);

const PageShell: React.FC<{ title:string; desc:string; t:any; children:React.ReactNode }> = ({ title, desc, t, children }) => (
  <div>
    <h2 style={{ fontSize:18, fontWeight:500, color:t.textHead, margin:"0 0 4px" }}>{title}</h2>
    <p style={{ fontSize:13, color:t.textMuted, margin:"0 0 20px" }}>{desc}</p>
    {children}
  </div>
);

export default App;
