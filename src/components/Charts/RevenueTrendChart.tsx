import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppSelector } from "../../hooks/redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RevenueTrendChart: React.FC = () => {
  const { monthlyRevenue } = useAppSelector((s) => s.dashboard);

  const data = {
    labels: monthlyRevenue.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue.map((d) => d.revenue),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.12)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "#3B82F6",
        borderWidth: 2,
      },
      {
        label: "Target",
        data: monthlyRevenue.map((d) => d.target),
        borderColor: "#8B5CF6",
        borderDash: [4, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
        backgroundColor: "transparent",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` $${ctx.parsed.y.toFixed(2)}M`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#8B9EC7", font: { size: 10 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: {
          color: "#8B9EC7",
          font: { size: 10 },
          callback: (v: any) => `$${v}M`,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="bg-surface-700 border border-surface-500 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[13px] font-medium text-white">Revenue Trend</h3>
          <p className="text-[10px] text-slate-400">Monthly revenue · Jan – Jun 2026</p>
        </div>
      </div>
      <div className="relative h-40">
        <Line data={data} options={options as any} aria-label="Monthly revenue trend line chart" />
      </div>
      <div className="flex gap-4 mt-2">
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" /> Revenue
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm border border-purple-400 inline-block" /> Target
        </span>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
