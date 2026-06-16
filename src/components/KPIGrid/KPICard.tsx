import React from "react";
import type { KPICard as KPICardType } from "../../types";
import { useAppSelector } from "../../hooks/redux";

const COLOR_MAP: Record<string, string> = {
  blue: "#3B82F6", green: "#10B981", amber: "#F59E0B", purple: "#8B5CF6", red: "#EF4444",
};
const ICON_MAP: Record<string, string> = {
  dollar: "💵", users: "👥", bag: "🛍️", chart: "📈", percent: "🎯",
};

const KPICard: React.FC<{ card: KPICardType }> = ({ card }) => {
  const mode = useAppSelector((s) => s.theme.mode);
  const isDark = mode === "dark";
  const accent = COLOR_MAP[card.color] ?? "#3B82F6";

  return (
    <div style={{
      background: isDark ? "#1E2A3B" : "#FFFFFF",
      border: `1px solid ${isDark ? "#2A3A50" : "#E2E8F0"}`,
      borderTop: `2px solid ${accent}`,
      borderRadius: 8,
      padding: "12px 14px",
      transition: "background 0.25s",
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:11, color: isDark ? "#8B9EC7" : "#64748B" }}>{card.label}</span>
        <span style={{ width:26, height:26, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, background:`${accent}22` }}>
          {ICON_MAP[card.icon] ?? "📊"}
        </span>
      </div>
      <p style={{ fontSize:20, fontWeight:500, fontFamily:"monospace", color: isDark ? "#FFFFFF" : "#0F172A", marginBottom:4 }}>
        {card.value}
      </p>
      <p style={{ fontSize:10, color: card.direction === "down" ? "#EF4444" : "#10B981", display:"flex", alignItems:"center", gap:3 }}>
        {card.direction === "down" ? "▼" : "▲"} {card.delta}
      </p>
    </div>
  );
};

export default KPICard;
