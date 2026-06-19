import React from "react";
import RevenueTrendChart from "./RevenueTrendChart";
import SalesComparisonChart from "./SalesComparisonChart";
import CustomerGrowthChart from "./CustomerGrowthChart";
import CategoryDistributionChart from "./CategoryDistributionChart";

const ChartsGrid: React.FC = () => (
  <div
    style={{
      display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 12,
      marginBottom: 16,
    }}
  >
    <RevenueTrendChart />
    <SalesComparisonChart />
    <CustomerGrowthChart />
    <CategoryDistributionChart />
  </div>
);

export default ChartsGrid;