import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Signup: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    navigate("/onboarding");
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-all ${
      errors[field] ? "border-red-400" : isDark ? "border-slate-700 focus:border-blue-500" : "border-slate-200 focus:border-blue-400"
    } ${isDark ? "bg-slate-800 text-white placeholder-slate-500" : "bg-white text-slate-900 placeholder-slate-400"}`;

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl" />
        </div>
        <Link to="/" className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">T</div>
          <span className="text-white font-semibold text-lg">TaskFlow Pro</span>
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-4">Start shipping faster</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Join 50,000+ teams who use TaskFlow Pro to deliver projects on time, every time.
          </p>
          <div className="space-y-3">
            {["No credit card required", "Free 14-day trial", "Cancel anytime", "Setup in under 5 minutes"].map((f) => (
              <div key={f} className="flex items-center gap-3 text-blue-100">
                <span className="text-emerald-400">✓</span>
                <span className="text-[14px]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-blue-100 text-[12px]">© 2026 TaskFlow Pro. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <button onClick={toggleTheme} className={`absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? "bg-slate-800 text-yellow-400" : "bg-white text-slate-700 border border-slate-200"}`}>
          {isDark ? "☀️" : "🌙"}
        </button>

        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">T</div>
            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>TaskFlow Pro</span>
          </div>

          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Create your account</h1>
          <p className={`text-[13px] mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Full name</label>
              <input className={inputClass("name")} placeholder="Hassan Mansoori"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Work email</label>
              <input type="email" className={inputClass("email")} placeholder="you@company.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Password</label>
              <input type="password" className={inputClass("password")} placeholder="Min. 8 characters"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : isDark ? "bg-slate-700" : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <p className={`text-[11px] ${strength === 1 ? "text-red-400" : strength === 2 ? "text-amber-400" : "text-emerald-400"}`}>
                    {strengthLabels[strength]} password
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-[11px] mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Confirm password</label>
              <input type="password" className={inputClass("confirm")} placeholder="Repeat password"
                value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              {errors.confirm && <p className="text-red-400 text-[11px] mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[14px] transition-all hover:shadow-lg hover:shadow-blue-500/25">
              Create account →
            </button>

            <p className={`text-center text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              By signing up, you agree to our <span className="text-blue-400 cursor-pointer">Terms of Service</span> and <span className="text-blue-400 cursor-pointer">Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
