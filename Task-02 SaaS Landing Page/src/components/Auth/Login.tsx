import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Login: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    navigate("/dashboard");
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-[13px] outline-none transition-all ${
      errors[field] ? "border-red-400 focus:border-red-400" : isDark ? "border-slate-700 focus:border-blue-500" : "border-slate-200 focus:border-blue-400"
    } ${isDark ? "bg-slate-800 text-white placeholder-slate-500" : "bg-white text-slate-900 placeholder-slate-400"}`;

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-500 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
        </div>
        <Link to="/" className="relative flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">T</div>
          <span className="text-white font-semibold text-lg">TaskFlow Pro</span>
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome back!</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Log in to manage your projects, track progress, and collaborate with your team.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "50K+", label: "Teams trust us" },
              { num: "2M+", label: "Tasks completed" },
              { num: "99.9%", label: "Uptime SLA" },
              { num: "4.9★", label: "User rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-white text-2xl font-bold">{s.num}</div>
                <div className="text-blue-100 text-[12px]">{s.label}</div>
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

          <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Log in to your account</h1>
          <p className={`text-[13px] mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Sign up free</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-[12px] font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>Email address</label>
              <input type="email" className={inputClass("email")} placeholder="you@company.com"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-[12px] font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>Password</label>
                <span className="text-[12px] text-blue-400 cursor-pointer hover:text-blue-300">Forgot password?</span>
              </div>
              <input type="password" className={inputClass("password")} placeholder="••••••••"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <p className="text-red-400 text-[11px] mt-1">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[14px] transition-all hover:shadow-lg hover:shadow-blue-500/25 mt-2">
              Log in →
            </button>
          </form>

          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center`}><div className={`w-full border-t ${isDark ? "border-slate-700" : "border-slate-200"}`} /></div>
            <div className="relative flex justify-center">
              <span className={`px-3 text-[12px] ${isDark ? "bg-slate-900 text-slate-500" : "bg-slate-50 text-slate-400"}`}>or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map((p) => (
              <button key={p} className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[13px] font-medium transition-all ${
                isDark ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                {p === "Google" ? "🌐" : "⚫"} {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
