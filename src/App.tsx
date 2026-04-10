import { useEffect, useState } from 'react'
import './App.css'
import { MOCK_ASSETS } from './data/assets.ts'
import type { AssetRow } from './types/asset.ts'
import { AssetsTable } from './components/AssetsTable.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { StatsCards } from './components/StatsCards.tsx'

function cloneRowsForState(): AssetRow[] {
  return MOCK_ASSETS.map((r) => ({ ...r }))
}

export default function App() {
  const [filter, setFilter] = useState<'all' | 'active'>('all')

  // M3a: initializer runs every render (should use () => cloneRowsForState())
  const [assets] = useState(cloneRowsForState())

  // M3b: title should update when filter changes — missing `filter` in deps
  useEffect(() => {
    document.title = `Ops — ${filter === 'all' ? 'All assets' : 'Active only'}`
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: stale document title when filter changes
  }, [])

  const visible =
    filter === 'all' ? assets : assets.filter((a) => a.status === 'active')

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="toolbar">
          <label htmlFor="filter-select">Filter</label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value === 'active' ? 'active' : 'all')
            }}
          >
            <option value="all">All</option>
            <option value="active">Active only</option>
          </select>
        </div>
        <StatsCards rows={visible} />
        <AssetsTable rows={visible} />
      </main>
      <Footer />
    </div>
  )
}
