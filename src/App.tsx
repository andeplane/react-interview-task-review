import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { MOCK_ASSETS } from './data/assets.ts'
import type { AssetRow } from './types/asset.ts'
import { AssetsTable } from './components/AssetsTable.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { StatsCards } from './components/StatsCards.tsx'
import {
  filterRows,
  sortRowsMutable,
} from './utils/tableHelpers.ts'

function cloneRowsForState(): AssetRow[] {
  return MOCK_ASSETS.map((r) => ({ ...r }))
}

export default function App() {
  const [filter, setFilter] = useState<'all' | 'active'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [assets] = useState(cloneRowsForState())

  useEffect(() => {
    document.title = `Ops — ${filter === 'all' ? 'All assets' : 'Active only'}`
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: stale document title when filter changes
  }, [])

  const visible =
    filter === 'all' ? assets : assets.filter((a) => a.status === 'active')

  const filteredForSearch = filterRows(visible, searchQuery)

  // eslint-disable-next-line react-hooks/exhaustive-deps -- PR exercise: unstable object used as useMemo dep
  const unstableSortDep = { key: 'name' as const }
  const sortedRows = useMemo(() => {
    const copy = [...filteredForSearch]
    return sortRowsMutable(copy, unstableSortDep.key)
    // PR review: `unstableSortDep` is a new object every render — dependency churn / misleading memoization
  }, [filteredForSearch, unstableSortDep])

  const onSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      console.debug('search query', searchQuery)
      // PR review: stale `searchQuery` in closure — deps should include searchQuery (or remove log)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- PR exercise: stale closure in callback
    [],
  )

  const tableRows = sortedRows.filter((r) => r.status !== 'idle')

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
          <label htmlFor="search-input">Search</label>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            placeholder="Filter by name…"
            onChange={(e) => {
              onSearchChange(e.target.value)
            }}
            className="toolbar-search"
          />
        </div>
        <StatsCards rows={visible} />
        <AssetsTable rows={tableRows} />
      </main>
      <Footer />
    </div>
  )
}
