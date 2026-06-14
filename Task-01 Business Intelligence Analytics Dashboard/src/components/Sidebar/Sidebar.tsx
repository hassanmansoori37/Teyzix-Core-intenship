import React, { useState } from "react";

interface NavItem {
  icon: string;
  label: string;
  badge?: number;
  active?: boolean;
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Main",
    items: [
      { icon: "⊞", label: "Dashboard", active: true },
      { icon: "📊", label: "Analytics", badge: 3 },
      { icon: "📄", label: "Reports" },
      { icon: "👥", label: "Customers" },
    ],
  },
  {
    section: "Sales",
    items: [
      { icon: "🛒", label: "Orders" },
      { icon: "💵", label: "Revenue" },
      { icon: "🎯", label: "Goals" },
    ],
  },
  {
    section: "System",
    items: [{ icon: "⚙️", label: "Settings" }],
  },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="w-[210px] flex-shrink-0 bg-surface-800 dark:bg-surface-800 border-r border-surface-500 flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-[18px] border-b border-surface-500">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white text-sm font-medium">
            T
          </div>
          <div>
            <p className="text-[14px] font-medium text-white leading-tight">Teyzix Core</p>
            <p className="text-[10px] text-slate-400 leading-tight">Analytics Suite</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map((group) => (
          <div key={group.section} className="mb-1">
            <p className="px-3 pb-1 pt-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              {group.section}
            </p>
            {group.items.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`w-full flex items-center gap-2 px-3 py-[7px] mx-2 rounded-md text-left transition-all text-[12.5px] mb-[2px]
                  ${
                    activeItem === item.label
                      ? "bg-blue-500/20 text-blue-300"
                      : "text-slate-400 hover:bg-blue-500/10 hover:text-slate-200"
                  }`}
                style={{ width: "calc(100% - 16px)" }}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-brand-500 text-white text-[10px] px-[6px] py-[1px] rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-surface-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0">
            MA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-white truncate">M. Ahmed</p>
            <p className="text-[10px] text-slate-400">Admin</p>
          </div>
          <span className="text-slate-500 text-sm cursor-pointer hover:text-slate-300">↪</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
