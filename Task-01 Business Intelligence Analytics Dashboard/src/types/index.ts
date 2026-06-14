// ── KPI ────────────────────────────────────────────────────────────────────
export interface KPICard {
  id: string;
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "neutral";
  color: "blue" | "green" | "amber" | "purple" | "red";
  icon: string;
}

// ── Chart data ──────────────────────────────────────────────────────────────
export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
}

export interface SalesComparison {
  category: string;
  q1: number;
  q2: number;
}

export interface CustomerGrowth {
  month: string;
  newCustomers: number;
  returning: number;
}

export interface CategoryDistribution {
  label: string;
  value: number;
  color: string;
}

// ── Table ───────────────────────────────────────────────────────────────────
export type CustomerStatus = "Active" | "Pending" | "Inactive";
export type Region = "North" | "South" | "East" | "West" | "Central";

export interface Customer {
  id: string;
  name: string;
  revenue: number;
  orders: number;
  status: CustomerStatus;
  region: Region;
}

// ── Table state ─────────────────────────────────────────────────────────────
export type SortField = keyof Customer;
export type SortDir = "asc" | "desc";

export interface TableState {
  search: string;
  statusFilter: CustomerStatus | "";
  regionFilter: Region | "";
  sortField: SortField;
  sortDir: SortDir;
  page: number;
  perPage: number;
}

// ── Redux slices ────────────────────────────────────────────────────────────
export interface ThemeState {
  mode: "dark" | "light";
}

export interface DashboardState {
  kpis: KPICard[];
  monthlyRevenue: MonthlyRevenue[];
  salesComparison: SalesComparison[];
  customerGrowth: CustomerGrowth[];
  categoryDistribution: CategoryDistribution[];
  customers: Customer[];
  loading: boolean;
  error: string | null;
}
