# Operations dashboard (interview exercise)

## What this app is

This is a **small, fake internal “operations” UI** for monitoring **industrial assets** (pumps, valves, sensors, compressors, etc.). It is meant to feel like something a maintenance or plant-ops team might use to get a quick read on how equipment is doing across regions.

**In the UI you get:**

- A **header** with the product title and a short tagline.
- **Summary cards** (KPIs) such as how many assets are tracked, how many are running (active), how many need attention (error state), and how many are idle.
- A **filter** to switch between “all assets” and “active only.”
- An **assets table** with columns for name, region, owner column, status, and notes—backed by **in-memory mock data** only (no real API, auth, or backend).

Pull requests in this repo add things like **search/helpers**, **CSV export**, or **polled stats**—still against mocks, but realistic enough to review like production React code.

This repository exists for **code review** interviews: candidates **read** the code and discuss problems (bugs, risks, maintainability)—not to ship a product or spend the session implementing large features.

## Setup

```bash
npm install
npm run dev
```

- **Dev server:** [http://localhost:5173](http://localhost:5173) (Vite default)
- **Production build:** `npm run build`
- **Lint:** `npm run lint`

## What candidates do

1. Run the app locally so the UI context is clear.
2. Review **`main`** and/or **open pull requests** in this repository (feature branches are listed below).
3. Prepare feedback: what looks wrong, why it matters, and how you’d fix or prioritize it (discussion format—no need to open fixes unless the interviewer asks).

Allow roughly **45–60 minutes** for `main` plus **one or two** PRs, depending on the slot.

## Feature branches (open as PRs into `main`)

| Branch | Theme |
|--------|--------|
| `feature/table-helpers` | Sort / filter helpers and search field |
| `feature/csv-export` | CSV export for visible rows |
| `feature/poll-stats` | Polled KPI stats from mock JSON |

## Tech

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev)
