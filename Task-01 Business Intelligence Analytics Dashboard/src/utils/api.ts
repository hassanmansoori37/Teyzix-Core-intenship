import axios from "axios";
import type {
  KPICard,
  MonthlyRevenue,
  SalesComparison,
  CustomerGrowth,
  CategoryDistribution,
  Customer,
} from "../types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  timeout: 8000,
});

export const fetchKPIs = (): Promise<KPICard[]> =>
  api.get<KPICard[]>("/kpis").then((r) => r.data);

export const fetchMonthlyRevenue = (): Promise<MonthlyRevenue[]> =>
  api.get<MonthlyRevenue[]>("/monthlyRevenue").then((r) => r.data);

export const fetchSalesComparison = (): Promise<SalesComparison[]> =>
  api.get<SalesComparison[]>("/salesComparison").then((r) => r.data);

export const fetchCustomerGrowth = (): Promise<CustomerGrowth[]> =>
  api.get<CustomerGrowth[]>("/customerGrowth").then((r) => r.data);

export const fetchCategoryDistribution = (): Promise<CategoryDistribution[]> =>
  api.get<CategoryDistribution[]>("/categoryDistribution").then((r) => r.data);

export const fetchCustomers = (): Promise<Customer[]> =>
  api.get<Customer[]>("/customers").then((r) => r.data);
