import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import dashboardReducer from "./slices/dashboardSlice";
import tableReducer from "./slices/tableSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
