import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSearch, setStatusFilter, setRegionFilter, toggleSort, setPage } from "../../store/slices/tableSlice";
import { exportCustomersCSV } from "../../utils/exportCSV";
import type { Customer, SortField, CustomerStatus, Region } from "../../types";

const COLUMNS: { key: SortField; label: string }[] = [
  { key:"name",    label:"Customer Name" },
  { key:"revenue", label:"Revenue"       },
  { key:"orders",  label:"Orders"        },
  { key:"status",  label:"Status"        },
  { key:"region",  label:"Region"        },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Active:   { bg:"rgba(16,185,129,0.15)",  color:"#6EE7B7" },
  Pending:  { bg:"rgba(245,158,11,0.15)",  color:"#FCD34D" },
  Inactive: { bg:"rgba(239,68,68,0.12)",   color:"#FCA5A5" },
};

const DataTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((s) => s.dashboard);
  const { search, statusFilter, regionFilter, sortField, sortDir, page, perPage } = useAppSelector((s) => s.table);
  const mode = useAppSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const t = {
    bg:      isDark ? "#1E2A3B" : "#FFFFFF",
    bg2:     isDark ? "#162032" : "#F8FAFC",
    border:  isDark ? "#2A3A50" : "#E2E8F0",
    head:    isDark ? "#FFFFFF" : "#0F172A",
    main:    isDark ? "#E2E8F0" : "#1E293B",
    muted:   isDark ? "#8B9EC7" : "#64748B",
  };

  const filtered = useMemo(() => {
    let data = [...customers];
    if (search) data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) data = data.filter(c => c.status === statusFilter);
    if (regionFilter) data = data.filter(c => c.region === regionFilter);
    data.sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      const cmp = typeof av === "number" ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [customers, search, statusFilter, regionFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice: Customer[] = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div style={{ textAlign:"center", padding:40, color:t.muted }}>⏳ Loading data…</div>;
  if (error)   return <div style={{ textAlign:"center", padding:40, color:"#EF4444" }}>⚠️ {error}</div>;

  const inputStyle: React.CSSProperties = { background:t.bg2, border:`1px solid ${t.border}`, borderRadius:6, padding:"6px 10px", color:t.main, fontSize:12, fontFamily:"inherit", outline:"none" };

  return (
    <div style={{ background:t.bg, border:`1px solid ${t.border}`, borderRadius:8, padding:"14px 16px", marginBottom:16, transition:"background 0.25s" }}>
      {/* Toolbar */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
        <div style={{ ...inputStyle, display:"flex", alignItems:"center", gap:6, flex:1, minWidth:180, padding:"5px 10px" }}>
          <span style={{ color:t.muted }}>🔍</span>
          <input value={search} onChange={e => dispatch(setSearch(e.target.value))} placeholder="Search name or region…"
            style={{ background:"transparent", border:"none", outline:"none", color:t.main, fontSize:12, width:"100%", fontFamily:"inherit" }} />
        </div>
        <select value={statusFilter} onChange={e => dispatch(setStatusFilter(e.target.value as CustomerStatus | ""))} style={{ ...inputStyle, cursor:"pointer" }}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select value={regionFilter} onChange={e => dispatch(setRegionFilter(e.target.value as Region | ""))} style={{ ...inputStyle, cursor:"pointer" }}>
          <option value="">All Regions</option>
          <option value="North">North</option><option value="South">South</option>
          <option value="East">East</option><option value="West">West</option><option value="Central">Central</option>
        </select>
        <button onClick={() => exportCustomersCSV(filtered)}
          style={{ background:"#3B82F6", border:"none", borderRadius:6, padding:"6px 14px", color:"#fff", fontSize:11, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
          ⬇ Export CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th key={col.key} onClick={() => dispatch(toggleSort(col.key))}
                  style={{ textAlign:"left", padding:"6px 10px", fontSize:11, textTransform:"uppercase", letterSpacing:"0.04em", color:t.muted, borderBottom:`1px solid ${t.border}`, cursor:"pointer", whiteSpace:"nowrap", fontWeight:500 }}>
                  {col.label} {sortField === col.key && <span style={{ color:"#3B82F6" }}>{sortDir === "asc" ? "▲" : "▼"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign:"center", padding:32, color:t.muted }}>📭 No records match your filters.</td></tr>
            ) : slice.map(c => (
              <tr key={c.id} style={{ borderBottom:`1px solid ${t.border}50` }}>
                <td style={{ padding:"8px 10px", fontWeight:500, color:t.head }}>{c.name}</td>
                <td style={{ padding:"8px 10px", fontFamily:"monospace", color:t.main }}>${c.revenue.toLocaleString()}</td>
                <td style={{ padding:"8px 10px", color:t.main }}>{c.orders}</td>
                <td style={{ padding:"8px 10px" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:99, fontSize:10, fontWeight:500, background:STATUS_COLORS[c.status]?.bg, color:STATUS_COLORS[c.status]?.color }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding:"8px 10px" }}>
                  <span style={{ fontSize:10, padding:"2px 8px", borderRadius:4, background:"rgba(139,92,246,0.15)", color:"#C4B5FD" }}>{c.region}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12 }}>
        <span style={{ fontSize:11, color:t.muted }}>
          Showing {filtered.length === 0 ? 0 : (page-1)*perPage+1}–{Math.min(page*perPage, filtered.length)} of {filtered.length} records
        </span>
        <div style={{ display:"flex", gap:4 }}>
          {Array.from({ length:totalPages }, (_,i) => i+1).map(pg => (
            <button key={pg} onClick={() => dispatch(setPage(pg))}
              style={{ padding:"4px 10px", borderRadius:5, border:`1px solid ${pg===page ? "rgba(59,130,246,0.4)" : t.border}`, background: pg===page ? "rgba(59,130,246,0.2)" : t.bg2, color: pg===page ? "#93C5FD" : t.muted, cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>
              {pg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

