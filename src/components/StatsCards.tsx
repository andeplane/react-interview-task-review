import type { AssetRow } from '../types/asset.ts'
import { summarizeAssets } from '../data/assets.ts'
import type { PollStats } from '../hooks/usePollStats.ts'

type Props = {
  rows: AssetRow[]
  /** When set, summary cards prefer polled numbers (can disagree with the table). */
  liveStats?: PollStats | null
}

export function StatsCards({ rows, liveStats }: Props) {
  const derived = summarizeAssets(rows)
  const { errors, idle, total } = liveStats ?? derived

  const activeCount = liveStats
    ? liveStats.active
    : rows.filter((r) => {
        // M6: loose equality — intentional review exercise
        return r.status == 'active'
      }).length

  return (
    <section className="stats-grid" aria-label="Summary">
      <article className="stat-card">
        <span className="stat-label">Tracked assets</span>
        <span className="stat-value">{total}</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Running (active)</span>
        <span className="stat-value">{activeCount}</span>
      </article>
      <article className="stat-card stat-card--warn">
        <span className="stat-label">Needs attention</span>
        <span className="stat-value">{errors}</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Idle</span>
        <span className="stat-value">{idle}</span>
      </article>
    </section>
  )
}
