import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TableState, SortField, SortDir, CustomerStatus, Region } from "../../types";

const initialState: TableState = {
  search: "",
  statusFilter: "",
  regionFilter: "",
  sortField: "revenue",
  sortDir: "desc",
  page: 1,
  perPage: 7,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setStatusFilter(state, action: PayloadAction<CustomerStatus | "">) {
      state.statusFilter = action.payload;
      state.page = 1;
    },
    setRegionFilter(state, action: PayloadAction<Region | "">) {
      state.regionFilter = action.payload;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<{ field: SortField; dir: SortDir }>) {
      state.sortField = action.payload.field;
      state.sortDir = action.payload.dir;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    toggleSort(state, action: PayloadAction<SortField>) {
      if (state.sortField === action.payload) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortField = action.payload;
        state.sortDir = "desc";
      }
      state.page = 1;
    },
  },
});

export const { setSearch, setStatusFilter, setRegionFilter, setSort, setPage, toggleSort } =
  tableSlice.actions;
export default tableSlice.reducer;
