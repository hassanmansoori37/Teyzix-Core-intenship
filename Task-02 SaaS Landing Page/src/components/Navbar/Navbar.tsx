import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navBg = isDark
    ? scrolled ? "bg-slate-900/95 shadow-lg shadow-slate-900/20" : "bg-transparent"
    : scrolled ? "bg-white/95 shadow-lg shadow-slate-200/50" : "bg-transparent";

  const textColor = isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">T</div>
            <span className={`font-semibold text-[15px] ${isDark ? "text-white" : "text-slate-900"}`}>TaskFlow Pro</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {["features", "testimonials", "pricing", "faq", "contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}
                className={`text-[13px] capitalize transition-colors ${textColor}`}>
                {item}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isDark ? "bg-slate-800 hover:bg-slate-700 text-yellow-400" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}>
              {isDark ? "☀️" : "🌙"}
            </button>

            <Link to="/login"
              className={`hidden md:block text-[13px] px-4 py-2 rounded-lg transition-all ${
                isDark ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
              Log in
            </Link>

            <Link to="/signup"
              className="text-[13px] px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all font-medium">
              Get started
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700"}`}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className={`md:hidden border-t ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
          <div className="px-4 py-4 flex flex-col gap-3">
            {["features", "testimonials", "pricing", "faq", "contact"].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}
                className={`text-left text-[13px] capitalize py-2 ${textColor}`}>
                {item}
              </button>
            ))}
            <div className="border-t pt-3 mt-1 flex gap-2" style={{ borderColor: isDark ? "#1E293B" : "#E2E8F0" }}>
              <Link to="/login" className={`flex-1 text-center text-[13px] py-2 rounded-lg ${isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="flex-1 text-center text-[13px] py-2 rounded-lg bg-blue-500 text-white" onClick={() => setMenuOpen(false)}>Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
