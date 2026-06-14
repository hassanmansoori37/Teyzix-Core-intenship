import React from "react";

interface Props {
  message: string;
}

const ErrorState: React.FC<Props> = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
    <span className="text-3xl">⚠️</span>
    <p className="text-[13px] font-medium text-red-400">Something went wrong</p>
    <p className="text-[11px] text-slate-400 max-w-xs">{message}</p>
    <p className="text-[11px] text-slate-500 mt-1">
      Make sure <code className="text-blue-400">json-server</code> is running on port 3001.
    </p>
  </div>
);

export default ErrorState;
