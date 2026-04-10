import { useEffect, useState } from 'react'
import './App.css'
import { MOCK_ASSETS } from './data/assets.ts'
import type { AssetRow } from './types/asset.ts'
import { AssetsTable } from './components/AssetsTable.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { StatsCards } from './components/StatsCards.tsx'
import { delay, rowsToCsv } from './utils/csvExport.ts'

function cloneRowsForState(): AssetRow[] {
  return MOCK_ASSETS.map((r) => ({ ...r }))
}

export default function App() {
  const [filter, setFilter] = useState<'all' | 'active'>('all')
  const [exportStatus, setExportStatus] = useState<string | null>(null)

  const [assets] = useState(cloneRowsForState())

  useEffect(() => {
    document.title = `Ops — ${filter === 'all' ? 'All assets' : 'Active only'}`
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: stale document title when filter changes
  }, [])

  const visible =
    filter === 'all' ? assets : assets.filter((a) => a.status === 'active')

  const handleExport = async () => {
    setExportStatus('Exported successfully')
    const csv = rowsToCsv(visible)
    await delay(30)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'assets.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

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
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => {
              void handleExport()
            }}
          >
            Export CSV
          </button>
          {exportStatus !== null ? (
            <span className="toolbar-status" role="status">
              {exportStatus}
            </span>
          ) : null}
        </div>
        <StatsCards rows={visible} />
        <AssetsTable rows={visible} />
      </main>
      <Footer />
    </div>
  )
}
