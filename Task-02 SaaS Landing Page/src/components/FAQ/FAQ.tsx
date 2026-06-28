import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const FAQS = [
  { q: "Can I try TaskFlow Pro for free?", a: "Yes! Our free plan includes 3 projects and 5 team members with no credit card required. Upgrade anytime." },
  { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can cancel anytime and you'll retain access until the end of your billing period. No questions asked." },
  { q: "Does TaskFlow integrate with other tools?", a: "Yes — we integrate with Slack, GitHub, Jira, Google Drive, Figma, Notion, and 50+ other tools via our API." },
  { q: "Is my data secure?", a: "We use bank-level AES-256 encryption and are SOC 2 Type II certified. Your data is always safe and backed up." },
  { q: "Can I migrate from another tool?", a: "Yes! We support importing from Trello, Asana, Jira, and Monday.com. Our migration team will help you get set up." },
  { q: "Do you offer discounts for startups or nonprofits?", a: "Yes, we offer 50% discounts for eligible startups (under 2 years old) and nonprofits. Contact our sales team." },
];

const FAQ: React.FC = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={`py-24 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>FAQ</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Frequently asked questions
          </h2>
          <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Everything you need to know about TaskFlow Pro.
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className={`rounded-xl border overflow-hidden transition-all ${
              isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all ${
                  isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}>
                <span className={`font-medium text-[14px] ${isDark ? "text-white" : "text-slate-900"}`}>{faq.q}</span>
                <span className={`text-[18px] transition-transform ${open === i ? "rotate-45" : ""} ${isDark ? "text-slate-400" : "text-slate-500"}`}>+</span>
              </button>
              {open === i && (
                <div className={`px-6 pb-4 text-[13px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
