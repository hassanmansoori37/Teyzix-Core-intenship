# Teyzix Core — Business Intelligence Dashboard

**Task:** FEWD-1 | Frontend Web Development | Intermediate  
**Intern:** June 2026 Batch

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS (dark mode via `class`) |
| State | Redux Toolkit (themeSlice, dashboardSlice, tableSlice) |
| Charts | Chart.js + react-chartjs-2 |
| API | Axios → JSON Server (mock REST API) |
| Data | `src/data/db.json` |

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar/          # Navigation sidebar
│   ├── Topbar/           # Header + theme toggle
│   ├── KPIGrid/          # KPICard + KPIGrid
│   ├── Charts/           # 4 Chart components + ChartsGrid
│   ├── DataTable/        # Full-featured data table
│   └── common/           # LoadingSpinner, ErrorState, EmptyState
├── store/
│   └── slices/           # themeSlice, dashboardSlice, tableSlice
├── hooks/
│   └── redux.ts          # Typed useAppDispatch / useAppSelector
├── utils/
│   ├── api.ts            # Axios calls
│   └── exportCSV.ts      # CSV export utility
├── types/
│   └── index.ts          # All TypeScript interfaces
└── data/
    └── db.json           # Mock database for JSON Server
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the mock API (in one terminal)
```bash
npm run server
# Runs JSON Server on http://localhost:3001
```

### 3. Start the React app (in another terminal)
```bash
npm start
# Opens http://localhost:3000
```

---

## Features

- **5 KPI cards** — Revenue, Customers, Orders, Growth, Conversion Rate
- **4 Charts** — Revenue Trend (line), Sales Comparison (bar), Customer Growth (area), Category Distribution (donut)
- **Data table** — search, sort, status/region filter, pagination, CSV export
- **Theme** — dark/light toggle with `localStorage` persistence
- **API states** — loading spinner, error message, empty state
- **Responsive** — desktop, tablet (sidebar collapses), mobile

---

## Bonus Features Implemented

- CSV export of filtered customer data
- Loading / error / empty states on every data section
- Theme persistence across page reloads

---

## Deployment

```bash
npm run build
# Output in /build — deploy to Vercel, Netlify, or GitHub Pages
```

For Vercel: connect GitHub repo → framework preset `Create React App` → deploy.

---

## Evaluation Checklist

| Criteria | Implementation |
|---|---|
| UI/UX Quality | Dark command-center aesthetic, color-coded KPIs, custom chart legends |
| Component Architecture | Reusable KPICard, chart components, common components |
| State Management | Redux Toolkit with 3 typed slices + async thunk |
| Responsiveness | Tailwind responsive grid, sidebar hidden on mobile |
| Code Quality | Full TypeScript, no `any` except Chart.js callbacks |
| Documentation | This README |
