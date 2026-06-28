import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const STEPS = ["Account", "Company", "Project", "Done"];

const Onboarding: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", role: "",
    company: "", size: "", industry: "",
    project: "", type: "", deadline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-all ${
      errors[field] ? "border-red-400" : isDark ? "border-slate-700 focus:border-blue-500" : "border-slate-200 focus:border-blue-400"
    } ${isDark ? "bg-slate-800 text-white placeholder-slate-500" : "bg-white text-slate-900 placeholder-slate-400"}`;

  const selectClass = `w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-all cursor-pointer ${
    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`;

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.trim()) e.email = "Email is required";
    }
    if (step === 1) {
      if (!form.company.trim()) e.company = "Company name is required";
    }
    if (step === 2) {
      if (!form.project.trim()) e.project = "Project name is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
  };

  const back = () => { if (step > 0) setStep(step - 1); };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold">T</div>
          <span className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>TaskFlow Pro</span>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.slice(0, 3).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all ${
                    i < step ? "bg-blue-500 text-white" : i === step ? "bg-blue-500 text-white ring-4 ring-blue-500/20" : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-400"}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[12px] hidden sm:block ${i === step ? "text-blue-400 font-medium" : isDark ? "text-slate-500" : "text-slate-400"}`}>{s}</span>
                  {i < 2 && <div className={`w-12 sm:w-20 h-0.5 ml-2 ${i < step ? "bg-blue-500" : isDark ? "bg-slate-700" : "bg-slate-200"}`} />}
                </div>
              ))}
            </div>
            <p className={`text-[12px] text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}>Step {step + 1} of 3</p>
          </div>
        )}

        <div className={`p-8 rounded-2xl border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>

          {/* Step 0 — Account */}
          {step === 0 && (
            <>
              <h2 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Create your account</h2>
              <p className={`text-[13px] mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Let's start with some basic information.</p>
              <div className="space-y-4">
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Full name *</label>
                  <input className={inputClass("name")} placeholder="Hassan Mansoori" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Work email *</label>
                  <input className={inputClass("email")} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Your role</label>
                  <select className={selectClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="">Select your role</option>
                    <option>Product Manager</option>
                    <option>Software Engineer</option>
                    <option>Team Lead</option>
                    <option>Founder / CEO</option>
                    <option>Designer</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 1 — Company */}
          {step === 1 && (
            <>
              <h2 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>About your company</h2>
              <p className={`text-[13px] mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Help us personalize your experience.</p>
              <div className="space-y-4">
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Company name *</label>
                  <input className={inputClass("company")} placeholder="Acme Inc." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  {errors.company && <p className="text-red-400 text-[11px] mt-1">{errors.company}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Team size</label>
                    <select className={selectClass} value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                      <option value="">Select size</option>
                      <option>1–5</option>
                      <option>6–20</option>
                      <option>21–50</option>
                      <option>51–200</option>
                      <option>200+</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Industry</label>
                    <select className={selectClass} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
                      <option value="">Select industry</option>
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>E-commerce</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2 — Project */}
          {step === 2 && (
            <>
              <h2 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>Create your first project</h2>
              <p className={`text-[13px] mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>You can always add more projects later.</p>
              <div className="space-y-4">
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Project name *</label>
                  <input className={inputClass("project")} placeholder="e.g. Website Redesign" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
                  {errors.project && <p className="text-red-400 text-[11px] mt-1">{errors.project}</p>}
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Project type</label>
                  <select className={selectClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select type</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Marketing Campaign</option>
                    <option>Product Launch</option>
                    <option>Research & Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Target deadline</label>
                  <input type="date" className={inputClass("deadline")} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
              </div>
            </>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>You're all set, {form.name || "there"}!</h2>
              <p className={`text-[13px] mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Your workspace is ready. Let's start building something great.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: "📋", title: "Create tasks", desc: "Add your first task" },
                  { icon: "👥", title: "Invite team", desc: "Bring teammates in" },
                  { icon: "📚", title: "Read docs", desc: "Get quick tips" },
                ].map((c) => (
                  <div key={c.title} className={`p-3 rounded-xl border ${isDark ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <div className={`text-[12px] font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{c.title}</div>
                    <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{c.desc}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/dashboard")}
                className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[14px] transition-all hover:shadow-lg hover:shadow-blue-500/25">
                Go to dashboard →
              </button>
            </div>
          )}

          {/* Nav buttons */}
          {step < 3 && (
            <div className="flex justify-between mt-6 pt-6 border-t" style={{ borderColor: isDark ? "#1E293B" : "#E2E8F0" }}>
              <button onClick={back} disabled={step === 0}
                className={`px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  step === 0 ? "opacity-0 pointer-events-none" : isDark ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}>
                ← Back
              </button>
              <button onClick={next}
                className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[13px] transition-all">
                {step === 2 ? "Complete setup ✓" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Onboarding;
