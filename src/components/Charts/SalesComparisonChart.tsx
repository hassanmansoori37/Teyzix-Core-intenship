import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppSelector } from "../../hooks/redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesComparisonChart: React.FC = () => {
  const { salesComparison } = useAppSelector((s) => s.dashboard);

  const data = {
    labels: salesComparison.map((d) => d.category),
    datasets: [
      {
        label: "Q1 2026",
        data: salesComparison.map((d) => d.q1),
        backgroundColor: "rgba(59,130,246,0.75)",
        borderRadius: 4,
        borderSkipped: false as const,
      },
      {
        label: "Q2 2026",
        data: salesComparison.map((d) => d.q2),
        backgroundColor: "rgba(16,185,129,0.75)",
        borderRadius: 4,
        borderSkipped: false as const,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#8B9EC7", font: { size: 10 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: {
          color: "#8B9EC7",
          font: { size: 10 },
          callback: (v: any) => `$${v}k`,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="bg-surface-700 border border-surface-500 rounded-lg p-4">
      <div className="mb-3">
        <h3 className="text-[13px] font-medium text-white">Sales Comparison</h3>
        <p className="text-[10px] text-slate-400">Q1 vs Q2 by product category</p>
      </div>
      <div className="relative h-40">
        <Bar data={data} options={options as any} aria-label="Q1 vs Q2 sales comparison bar chart" />
      </div>
      <div className="flex gap-4 mt-2">
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" /> Q1 2026
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Q2 2026
        </span>
      </div>
    </div>
  );
};

export default SalesComparisonChart;
