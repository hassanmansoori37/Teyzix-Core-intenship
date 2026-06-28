import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const PLANS = [
  {
    name: "Free", price: { monthly: 0, yearly: 0 }, color: "text-slate-400",
    desc: "Perfect for individuals and small teams getting started.",
    features: ["3 projects", "5 team members", "Basic analytics", "2GB storage", "Email support"],
    cta: "Get started free", ctaLink: "/signup", popular: false,
  },
  {
    name: "Pro", price: { monthly: 12, yearly: 9 }, color: "text-blue-400",
    desc: "For growing teams that need more power and flexibility.",
    features: ["Unlimited projects", "25 team members", "Advanced analytics", "50GB storage", "AI automation", "Priority support", "Custom integrations"],
    cta: "Start free trial", ctaLink: "/signup", popular: true,
  },
  {
    name: "Enterprise", price: { monthly: 49, yearly: 39 }, color: "text-purple-400",
    desc: "For large organizations with advanced security needs.",
    features: ["Unlimited everything", "Unlimited members", "Custom analytics", "Unlimited storage", "SSO & SAML", "Dedicated manager", "SLA guarantee", "Custom contracts"],
    cta: "Contact sales", ctaLink: "/contact", popular: false,
  },
];

const Pricing: React.FC = () => {
  const { isDark } = useTheme();
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className={`py-24 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>Pricing</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Simple, transparent pricing
          </h2>
          <p className={`text-lg max-w-xl mx-auto mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Start free, upgrade when you're ready. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className={`text-[13px] ${!yearly ? "text-blue-400 font-medium" : isDark ? "text-slate-400" : "text-slate-500"}`}>Monthly</span>
            <button onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full transition-all ${yearly ? "bg-blue-500" : isDark ? "bg-slate-700" : "bg-slate-300"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${yearly ? "left-7" : "left-1"}`} />
            </button>
            <span className={`text-[13px] ${yearly ? "text-blue-400 font-medium" : isDark ? "text-slate-400" : "text-slate-500"}`}>
              Yearly <span className="text-emerald-400 text-[11px]">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`relative p-6 rounded-2xl border transition-all ${
              plan.popular
                ? isDark ? "bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10" : "bg-blue-50 border-blue-300 shadow-lg shadow-blue-100"
                : isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-[11px] font-medium px-3 py-1 rounded-full">Most popular</span>
                </div>
              )}
              <div className={`text-[13px] font-semibold mb-1 ${plan.color}`}>{plan.name}</div>
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className={`text-[13px] mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>/user/mo</span>
              </div>
              <p className={`text-[12px] mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{plan.desc}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-[13px] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    <span className="text-emerald-400 text-[11px]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.ctaLink}
                className={`block w-full text-center py-3 rounded-xl font-medium text-[13px] transition-all ${
                  plan.popular
                    ? "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    : isDark ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
