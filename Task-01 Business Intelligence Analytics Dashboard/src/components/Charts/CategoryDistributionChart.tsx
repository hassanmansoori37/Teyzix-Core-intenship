import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useAppSelector } from "../../hooks/redux";

ChartJS.register(ArcElement, Tooltip);

const CategoryDistributionChart: React.FC = () => {
  const { categoryDistribution } = useAppSelector((s) => s.dashboard);

  const data = {
    labels: categoryDistribution.map((d) => d.label),
    datasets: [
      {
        data: categoryDistribution.map((d) => d.value),
        backgroundColor: categoryDistribution.map((d) => d.color),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div className="bg-surface-700 border border-surface-500 rounded-lg p-4">
      <div className="mb-3">
        <h3 className="text-[13px] font-medium text-white">Category Distribution</h3>
        <p className="text-[10px] text-slate-400">Revenue share by product line</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-40 w-40 flex-shrink-0">
          <Doughnut data={data} options={options} aria-label="Category distribution donut chart" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {categoryDistribution.map((d) => (
            <div key={d.label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: d.color }}
                />
                {d.label}
              </span>
              <span className="font-mono text-white">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>j
    </div>
  );
};

export default CategoryDistributionChart;
