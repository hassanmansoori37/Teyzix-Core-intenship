import { createSlice } from "@reduxjs/toolkit";
import type { ThemeState } from "../../types";

const saved = localStorage.getItem("teyzix-theme") as "dark" | "light" | null;

const initialState: ThemeState = {
  mode: saved ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("teyzix-theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
