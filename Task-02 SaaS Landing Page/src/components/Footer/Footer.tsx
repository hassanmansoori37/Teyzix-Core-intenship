import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
  Company: ["About us", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Status", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Cookie Policy"],
};

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`border-t ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">T</div>
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>TaskFlow Pro</span>
            </div>
            <p className={`text-[13px] leading-relaxed mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              The modern project management platform for high-performance teams.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "gh", "yt"].map((s) => (
                <div key={s} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-medium cursor-pointer transition-all ${
                  isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-500"}`}>{s}</div>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className={`font-semibold text-[13px] mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>{group}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <span className={`text-[13px] cursor-pointer transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
          <p className={`text-[12px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            © 2026 TaskFlow Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className={`text-[12px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
