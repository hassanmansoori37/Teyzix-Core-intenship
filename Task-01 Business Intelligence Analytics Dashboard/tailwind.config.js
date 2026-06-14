/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        surface: {
          900: "#0F1629",
          800: "#111827",
          700: "#1E2A3B",
          600: "#162032",
          500: "#2A3A50",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
