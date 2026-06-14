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
} from "chart.js";
import { useAppSelector } from "../../hooks/redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const CustomerGrowthChart: React.FC = () => {
  const { customerGrowth } = useAppSelector((s) => s.dashboard);

  const data = {
    labels: customerGrowth.map((d) => d.month),
    datasets: [
      {
        label: "New",
        data: customerGrowth.map((d) => d.newCustomers),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: "Returning",
        data: customerGrowth.map((d) => d.returning),
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#8B9EC7", font: { size: 10 } },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#8B9EC7", font: { size: 10 } },
        border: { display: false },
      },
    },
  };

  return (
    <div className="bg-surface-700 border border-surface-500 rounded-lg p-4">
      <div className="mb-3">
        <h3 className="text-[13px] font-medium text-white">Customer Growth</h3>
        <p className="text-[10px] text-slate-400">New vs returning · last 6 months</p>
      </div>
      <div className="relative h-40">
        <Line data={data} options={options as any} aria-label="Customer growth area chart" />
      </div>
      <div className="flex gap-4 mt-2">
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" /> New
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Returning
        </span>
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
