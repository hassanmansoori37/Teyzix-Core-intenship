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
      return rejectWithValue(err.message ?? "Failed to load dashboard data");
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
