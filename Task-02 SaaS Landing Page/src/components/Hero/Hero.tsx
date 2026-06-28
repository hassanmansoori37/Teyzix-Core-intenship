import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const STATS = [
  { num: "50K+", label: "Teams worldwide" },
  { num: "4.9★", label: "Average rating" },
  { num: "99.9%", label: "Uptime SLA" },
  { num: "2M+", label: "Tasks completed" },
];

const Hero: React.FC = () => {
  const { isDark } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-16 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium mb-8 animate-fade-up"
          style={{ background: isDark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.08)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}>
          🚀 New — AI-powered task automation is here
        </div>

        {/* Headline */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up ${isDark ? "text-white" : "text-slate-900"}`}
          style={{ animationDelay: "0.1s" }}>
          Ship projects faster<br />
          <span className="text-blue-500">with TaskFlow Pro</span>
        </h1>

        {/* Subtext */}
        <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up ${isDark ? "text-slate-400" : "text-slate-600"}`}
          style={{ animationDelay: "0.2s" }}>
          The all-in-one project management platform for modern teams. Plan, track, and deliver — together.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/signup"
            className="glow-pulse inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[15px] transition-all hover:scale-105">
            Start free trial →
          </Link>
          <button onClick={() => scrollTo("features")}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-[15px] transition-all hover:scale-105 ${
              isDark ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"}`}>
            See features ↓
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{s.num}</div>
              <div className={`text-[12px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard preview image placeholder */}
        <div className={`mt-16 rounded-2xl overflow-hidden border animate-fade-up ${isDark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
          style={{ animationDelay: "0.5s" }}>
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-slate-50"}`}>
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className={`ml-2 text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>taskflowpro.io/dashboard</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Active projects", val: "12", delta: "+2" },
                { label: "Tasks done", val: "84", delta: "+12" },
                { label: "Team members", val: "8", delta: "All active" },
                { label: "On time rate", val: "94%", delta: "+3%" },
              ].map((k) => (
                <div key={k.label} className={`rounded-xl p-3 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
                  <div className={`text-[10px] mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{k.label}</div>
                  <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{k.val}</div>
                  <div className="text-[10px] text-emerald-400">{k.delta}</div>
                </div>
              ))}
            </div>
            <div className={`rounded-xl p-4 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
              <div className={`text-[12px] font-medium mb-3 ${isDark ? "text-white" : "text-slate-700"}`}>Recent activity</div>
              {["Nadia completed 'Design review'", "New task added to Sprint 4", "Deadline approaching: API integration"].map((a, i) => (
                <div key={i} className={`flex items-center gap-2 text-[11px] py-1.5 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
