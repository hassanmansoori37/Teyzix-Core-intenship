import React from "react";

interface Props {
  label?: string;
}

const LoadingSpinner: React.FC<Props> = ({ label = "Loading…" }) => (
  <div className="flex items-center justify-center gap-3 py-10 text-slate-400">
    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-[12px]">{label}</span>
  </div>
);

export default LoadingSpinner;
