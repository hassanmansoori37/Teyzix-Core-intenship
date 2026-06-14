import React from "react";
import RevenueTrendChart from "./RevenueTrendChart";
import SalesComparisonChart from "./SalesComparisonChart";
import CustomerGrowthChart from "./CustomerGrowthChart";
import CategoryDistributionChart from "./CategoryDistributionChart";

const ChartsGrid: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
    <RevenueTrendChart />
    <SalesComparisonChart />
    <CustomerGrowthChart />
    <CategoryDistributionChart />
  </div>
);

export default ChartsGrid;
