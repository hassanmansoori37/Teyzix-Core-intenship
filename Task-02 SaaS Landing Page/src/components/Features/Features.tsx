import React from "react";
import { useTheme } from "../../context/ThemeContext";

const FEATURES = [
  { icon: "📋", title: "Kanban Boards", desc: "Visualize work with drag-and-drop task management across customizable columns.", color: "bg-blue-500/10 text-blue-400" },
  { icon: "👥", title: "Team Collaboration", desc: "Real-time comments, mentions, and file sharing to keep everyone aligned.", color: "bg-emerald-500/10 text-emerald-400" },
  { icon: "📊", title: "Analytics & Reports", desc: "Track progress and team performance with beautiful real-time dashboards.", color: "bg-amber-500/10 text-amber-400" },
  { icon: "🤖", title: "AI Automation", desc: "Auto-assign tasks, predict risks, and get smart suggestions powered by AI.", color: "bg-purple-500/10 text-purple-400" },
  { icon: "🔔", title: "Smart Notifications", desc: "Get notified about deadlines, mentions, and project updates instantly.", color: "bg-rose-500/10 text-rose-400" },
  { icon: "🔗", title: "50+ Integrations", desc: "Connect with Slack, GitHub, Google Drive, Jira, and many more tools.", color: "bg-cyan-500/10 text-cyan-400" },
];

const Features: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <section id="features" className={`py-24 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}>Features</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Everything your team needs
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Powerful features to keep projects on track and teams in sync.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isDark ? "bg-slate-800 border-slate-700 hover:border-blue-500/50" : "bg-slate-50 border-slate-200 hover:border-blue-300"}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${f.color}`}>{f.icon}</div>
              <h3 className={`font-semibold text-[15px] mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{f.title}</h3>
              <p className={`text-[13px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
