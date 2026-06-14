import React from "react";

interface Props {
  message: string;
}

const EmptyState: React.FC<Props> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
    <span className="text-2xl">📭</span>
    <p className="text-[12px] text-slate-400">{message}</p>
  </div>
);

export default EmptyState;
