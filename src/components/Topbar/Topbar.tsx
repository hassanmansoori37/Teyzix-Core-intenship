import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleTheme } from "../../store/slices/themeSlice";

const Topbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  const now = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center gap-3 px-5 py-3 border-b border-surface-500 bg-surface-800 flex-shrink-0">
      <div className="flex-1">
        <h1 className="text-[15px] font-medium text-white">Business Intelligence Overview</h1>
        <p className="text-[11px] text-slate-400">Last sync: 2 min ago</p>
      </div>

      <span className="text-[11px] text-slate-400 bg-surface-700 border border-surface-500 rounded-md px-3 py-1 hidden sm:block">
        📅 {now}
      </span>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="flex items-center gap-2 bg-surface-700 border border-surface-500 rounded-md px-3 py-1 text-[12px] text-slate-400 hover:text-white transition-colors"
        aria-label="Toggle theme"
      >
        {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Topbar;
