import React from "react";
import { useTheme } from "../../context/ThemeContext";

const TESTIMONIALS = [
  { name: "Sara Khan", role: "CTO, Launchpad", avatar: "SK", color: "#3B82F6", text: "TaskFlow transformed how our team works. We ship 2x faster now and our project visibility has never been better.", stars: 5 },
  { name: "Ali Raza", role: "Product Manager, TechCorp", avatar: "AR", color: "#10B981", text: "The AI features saved us hours every week. Absolute game changer for deadline management and resource allocation.", stars: 5 },
  { name: "Nida Farooq", role: "Lead Developer, Pixel Studio", avatar: "NF", color: "#8B5CF6", text: "Best project management tool we've used. Clean UI, powerful features, and excellent customer support.", stars: 5 },
  { name: "Hassan Ahmed", role: "Founder, StartupX", avatar: "HA", color: "#F59E0B", text: "TaskFlow Pro helped us scale from 5 to 50 people without losing any coordination. Absolutely essential.", stars: 5 },
  { name: "Zara Malik", role: "Engineering Manager, Fintech", avatar: "ZM", color: "#EF4444", text: "The Kanban boards and sprint planning features are top-notch. Our team loves using it every day.", stars: 5 },
  { name: "Omar Butt", role: "Director of Operations, LogiCo", avatar: "OB", color: "#06B6D4", text: "Integrations with Slack and GitHub made our workflow seamless. Highly recommend for any tech team.", stars: 5 },
];

const Testimonials: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <section id="testimonials" className={`py-24 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Testimonials</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Loved by teams worldwide
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            See what our customers say about TaskFlow Pro.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
              isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className={`text-[13px] leading-relaxed mb-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0"
                  style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <div className={`text-[13px] font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{t.name}</div>
                  <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
