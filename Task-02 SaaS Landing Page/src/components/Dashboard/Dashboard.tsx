import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const KPIS = [
  { label: "Active Projects", value: "12", delta: "+2 this week", color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Tasks Completed", value: "84", delta: "+12 today", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Team Members", value: "8", delta: "All active", color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "On Time Rate", value: "94%", delta: "+3% vs last week", color: "text-amber-400", bg: "bg-amber-500/10" },
];

const ACTIVITY = [
  { color: "bg-blue-400", text: "Nadia completed 'Design review'", time: "2m ago" },
  { color: "bg-emerald-400", text: "New task added to Sprint 4", time: "15m ago" },
  { color: "bg-amber-400", text: "Deadline approaching: API integration", time: "1h ago" },
  { color: "bg-purple-400", text: "Bilal joined the workspace", time: "2h ago" },
  { color: "bg-rose-400", text: "Project 'Mobile App' marked complete", time: "3h ago" },
];

const PROJECTS = [
  { name: "Website Redesign", progress: 75, members: 4, tasks: "18/24", color: "bg-blue-500" },
  { name: "Mobile App v2", progress: 45, members: 6, tasks: "9/20", color: "bg-purple-500" },
  { name: "API Integration", progress: 90, members: 3, tasks: "27/30", color: "bg-emerald-500" },
];

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "📋", label: "Projects" },
  { icon: "✅", label: "My Tasks" },
  { icon: "👥", label: "Team" },
  { icon: "📊", label: "Analytics" },
  { icon: "⚙️", label: "Settings" },
];

const Dashboard: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Sidebar */}
      <aside className={`w-56 flex-shrink-0 flex flex-col border-r ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <div className={`flex items-center gap-2 p-4 border-b ${isDark ? "border-slate-700" : "border-slate-200"}`}>
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">T</div>
          <span className={`font-semibold text-[14px] ${isDark ? "text-white" : "text-slate-900"}`}>TaskFlow Pro</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] transition-all ${
                activeNav === item.label
                  ? "bg-blue-500/15 text-blue-400 font-medium"
                  : isDark ? "text-slate-400 hover:bg-slate-700 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className={`p-3 border-t ${isDark ? "border-slate-700" : "border-slate-200"}`}>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[11px] font-bold">HM</div>
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] font-medium truncate ${isDark ? "text-white" : "text-slate-900"}`}>Hassan M.</p>
              <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <div>
            <h1 className={`text-[16px] font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Good morning, Hassan 👋</h1>
            <p className={`text-[12px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Here's what's happening today</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isDark ? "bg-slate-700 text-yellow-400" : "bg-slate-100 text-slate-700"}`}>
              {isDark ? "☀️" : "🌙"}
            </button>
            <Link to="/"
              className={`text-[12px] px-4 py-2 rounded-lg border transition-all ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              ← Back to site
            </Link>
            <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-medium transition-all">
              + New project
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {KPIS.map((k) => (
              <div key={k.label} className={`p-4 rounded-2xl border transition-all hover:-translate-y-0.5 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <span className={`text-lg ${k.color}`}>📈</span>
                </div>
                <p className={`text-[11px] mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{k.label}</p>
                <p className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{k.value}</p>
                <p className={`text-[11px] ${k.color}`}>{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projects */}
            <div className={`p-5 rounded-2xl border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-semibold text-[14px] ${isDark ? "text-white" : "text-slate-900"}`}>Active Projects</h2>
                <button className="text-[12px] text-blue-400 hover:text-blue-300">View all →</button>
              </div>
              <div className="space-y-4">
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.color}`} />
                        <span className={`text-[13px] font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{p.tasks} tasks</span>
                        <span className={`text-[11px] font-medium ${isDark ? "text-white" : "text-slate-700"}`}>{p.progress}%</span>
                      </div>
                    </div>
                    <div className={`h-1.5 rounded-full ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
                      <div className={`h-full rounded-full ${p.color} transition-all`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: p.members }).map((_, i) => (
                        <div key={i} className={`w-5 h-5 rounded-full border-2 ${isDark ? "border-slate-800" : "border-white"} bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-[8px]`} style={{ marginLeft: i > 0 ? -6 : 0 }}>
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      <span className={`text-[11px] ml-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{p.members} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className={`p-5 rounded-2xl border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-semibold text-[14px] ${isDark ? "text-white" : "text-slate-900"}`}>Recent Activity</h2>
                <button className="text-[12px] text-blue-400 hover:text-blue-300">View all →</button>
              </div>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${isDark ? "bg-slate-700/50" : "bg-slate-50"}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] ${isDark ? "text-slate-300" : "text-slate-700"}`}>{a.text}</p>
                      <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;
