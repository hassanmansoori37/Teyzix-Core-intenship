import React from "react";
import { useAppSelector } from "../../hooks/redux";
import KPICard from "./KPICard";

const KPIGrid: React.FC = () => {
  const { kpis, loading, error } = useAppSelector((s) => s.dashboard);

  if (loading) return <div style={{ textAlign:"center", padding:40, color:"#8B9EC7" }}>⏳ Loading KPIs…</div>;
  if (error)   return <div style={{ textAlign:"center", padding:40, color:"#EF4444" }}>⚠️ {error}</div>;
  if (!kpis.length) return <div style={{ textAlign:"center", padding:40, color:"#8B9EC7" }}>📭 No KPI data available.</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {kpis.map((card) => (
        <KPICard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default KPIGrid;
