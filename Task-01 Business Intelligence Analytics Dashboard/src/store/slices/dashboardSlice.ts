import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardState } from "../../types";
import {
  fetchKPIs,
  fetchMonthlyRevenue,
  fetchSalesComparison,
  fetchCustomerGrowth,
  fetchCategoryDistribution,
  fetchCustomers,
} from "../../utils/api";
 
// ── Static fallback data (used when API is unavailable) ──
const FALLBACK_KPIS = [
  { id:"revenue",    label:"Total Revenue",    value:"$4.82M", delta:"+18.4% vs last month", direction:"up"   as const, color:"blue"   as const, icon:"dollar"  },
  { id:"customers",  label:"Total Customers",  value:"24,190", delta:"+12.1% vs last month", direction:"up"   as const, color:"green"  as const, icon:"users"   },
  { id:"orders",     label:"Total Orders",     value:"8,347",  delta:"+7.6% vs last month",  direction:"up"   as const, color:"amber"  as const, icon:"bag"     },
  { id:"growth",     label:"Monthly Growth",   value:"+24.3%", delta:"+3.2pp vs target",     direction:"up"   as const, color:"purple" as const, icon:"chart"   },
  { id:"conversion", label:"Conversion Rate",  value:"6.84%",  delta:"-0.3pp vs last month", direction:"down" as const, color:"red"    as const, icon:"percent" },
];
 
const FALLBACK_MONTHLY_REVENUE = [
  { month:"Jan", revenue:3.2,  target:3.4 },
  { month:"Feb", revenue:3.6,  target:3.7 },
  { month:"Mar", revenue:3.9,  target:4.0 },
  { month:"Apr", revenue:4.1,  target:4.0 },
  { month:"May", revenue:4.5,  target:4.3 },
  { month:"Jun", revenue:4.82, target:4.6 },
];
 
const FALLBACK_SALES_COMPARISON = [
  { category:"Software",  q1:420, q2:580 },
  { category:"Hardware",  q1:310, q2:470 },
  { category:"Services",  q1:280, q2:340 },
  { category:"Training",  q1:510, q2:620 },
  { category:"Support",   q1:390, q2:520 },
];
 
const FALLBACK_CUSTOMER_GROWTH = [
  { month:"Jan", newCustomers:1800, returning:2200 },
  { month:"Feb", newCustomers:2100, returning:2500 },
  { month:"Mar", newCustomers:2400, returning:2700 },
  { month:"Apr", newCustomers:2600, returning:2900 },
  { month:"May", newCustomers:3100, returning:3200 },
  { month:"Jun", newCustomers:3400, returning:3600 },
];
 
const FALLBACK_CATEGORY_DISTRIBUTION = [
  { label:"Software",  value:34, color:"#3B82F6" },
  { label:"Hardware",  value:22, color:"#10B981" },
  { label:"Services",  value:18, color:"#8B5CF6" },
  { label:"Training",  value:14, color:"#F59E0B" },
  { label:"Support",   value:12, color:"#EF4444" },
];
 
const FALLBACK_CUSTOMERS = [
  { id:"c01",  name:"Nadia Rahman",    revenue:124500, orders:42, status:"Active"   as const, region:"North"   as const },
  { id:"c02",  name:"Bilal Hashmi",    revenue:98200,  orders:31, status:"Active"   as const, region:"South"   as const },
  { id:"c03",  name:"Saira Khan",      revenue:210000, orders:67, status:"Active"   as const, region:"East"    as const },
  { id:"c04",  name:"Omar Farooq",     revenue:67800,  orders:18, status:"Pending"  as const, region:"West"    as const },
  { id:"c05",  name:"Zainab Ali",      revenue:145600, orders:55, status:"Active"   as const, region:"Central" as const },
  { id:"c06",  name:"Ahmed Mirza",     revenue:32400,  orders:9,  status:"Inactive" as const, region:"North"   as const },
  { id:"c07",  name:"Fatima Siddiqui", revenue:187300, orders:60, status:"Active"   as const, region:"South"   as const },
  { id:"c08",  name:"Usman Baig",      revenue:54100,  orders:14, status:"Pending"  as const, region:"East"    as const },
  { id:"c09",  name:"Hina Javed",      revenue:230100, orders:78, status:"Active"   as const, region:"West"    as const },
  { id:"c10",  name:"Kamran Sheikh",   revenue:76500,  orders:22, status:"Active"   as const, region:"Central" as const },
  { id:"c11",  name:"Sana Malik",      revenue:41200,  orders:11, status:"Inactive" as const, region:"North"   as const },
  { id:"c12",  name:"Tariq Waqas",     revenue:162800, orders:49, status:"Active"   as const, region:"South"   as const },
  { id:"c13",  name:"Amna Riaz",       revenue:89300,  orders:27, status:"Pending"  as const, region:"East"    as const },
  { id:"c14",  name:"Faisal Qureshi",  revenue:310500, orders:95, status:"Active"   as const, region:"West"    as const },
  { id:"c15",  name:"Rida Noor",       revenue:58700,  orders:16, status:"Active"   as const, region:"Central" as const },
  { id:"c16",  name:"Hassan Raza",     revenue:195400, orders:62, status:"Active"   as const, region:"North"   as const },
  { id:"c17",  name:"Maryam Iqbal",    revenue:47600,  orders:13, status:"Inactive" as const, region:"South"   as const },
  { id:"c18",  name:"Ahsan Butt",      revenue:278900, orders:83, status:"Active"   as const, region:"East"    as const },
  { id:"c19",  name:"Shazia Hussain",  revenue:103200, orders:34, status:"Active"   as const, region:"West"    as const },
  { id:"c20",  name:"Dawood Niazi",    revenue:61400,  orders:19, status:"Pending"  as const, region:"Central" as const },
];
 
const initialState: DashboardState = {
  kpis: [],
  monthlyRevenue: [],
  salesComparison: [],
  customerGrowth: [],
  categoryDistribution: [],
  customers: [],
  loading: false,
  error: null,
};
 
export const loadDashboardData = createAsyncThunk(
  "dashboard/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const [kpis, monthlyRevenue, salesComparison, customerGrowth, categoryDistribution, customers] =
        await Promise.all([
          fetchKPIs(),
          fetchMonthlyRevenue(),
          fetchSalesComparison(),
          fetchCustomerGrowth(),
          fetchCategoryDistribution(),
          fetchCustomers(),
        ]);
      return { kpis, monthlyRevenue, salesComparison, customerGrowth, categoryDistribution, customers };
    } catch (err: any) {
      // API failed — use fallback static data
      return {
        kpis: FALLBACK_KPIS,
        monthlyRevenue: FALLBACK_MONTHLY_REVENUE,
        salesComparison: FALLBACK_SALES_COMPARISON,
        customerGrowth: FALLBACK_CUSTOMER_GROWTH,
        categoryDistribution: FALLBACK_CATEGORY_DISTRIBUTION,
        customers: FALLBACK_CUSTOMERS,
      };
    }
  }
);
 
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(loadDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
 
export default dashboardSlice.reducer;