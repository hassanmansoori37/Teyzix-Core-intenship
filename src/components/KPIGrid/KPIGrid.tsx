import React from "react";
import { useAppSelector } from "../../hooks/redux";
import KPICard from "./KPICard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

const KPIGrid: React.FC = () => {
  const { kpis, loading, error } = useAppSelector((s) => s.dashboard);

  if (loading) return <LoadingSpinner label="Loading KPIs…" />;
  if (error) return <ErrorState message={error} />;
  if (!kpis.length) return <EmptyState message="No KPI data available." />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
      {kpis.map((card) => (
        <KPICard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default KPIGrid;
