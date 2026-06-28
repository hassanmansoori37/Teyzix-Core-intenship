import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSent(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-all ${
      errors[field] ? "border-red-400" : isDark ? "border-slate-700 focus:border-blue-500" : "border-slate-200 focus:border-blue-400"
    } ${isDark ? "bg-slate-800 text-white placeholder-slate-500" : "bg-white text-slate-900 placeholder-slate-400"}`;

  return (
    <section id="contact" className={`py-24 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
            style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>Contact</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Get in touch
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Have a question or need a custom plan? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>We're here to help</h3>
            <p className={`text-[14px] leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Our team responds within 24 hours on business days. For urgent issues, use our live chat on the dashboard.
            </p>
            {[
              { icon: "📧", label: "Email", value: "hello@taskflowpro.io" },
              { icon: "📞", label: "Phone", value: "+1 (800) 123-4567" },
              { icon: "📍", label: "Office", value: "San Francisco, CA 94105" },
              { icon: "⏰", label: "Hours", value: "Mon–Fri, 9am–6pm PST" },
            ].map((c) => (
              <div key={c.label} className={`flex items-center gap-4 p-4 rounded-xl mb-3 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className={`text-[11px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>{c.label}</div>
                  <div className={`text-[14px] font-medium ${isDark ? "text-white" : "text-slate-700"}`}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className={`p-8 rounded-2xl border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Message sent!</h3>
                <p className={`text-[13px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Name *</label>
                    <input className={inputClass("name")} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Email *</label>
                    <input className={inputClass("email")} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Subject</label>
                  <input className={inputClass("subject")} placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Message *</label>
                  <textarea rows={5} className={inputClass("message")} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-[14px] transition-all hover:shadow-lg hover:shadow-blue-500/25">
                  Send message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
