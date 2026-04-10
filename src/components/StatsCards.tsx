import type { AssetRow } from '../types/asset.ts'
import { summarizeAssets } from '../data/assets.ts'

type Props = {
  rows: AssetRow[]
}

export function StatsCards({ rows }: Props) {
  const { errors, idle, total } = summarizeAssets(rows)

  return (
    <section className="stats-grid" aria-label="Summary">
      <article className="stat-card">
        <span className="stat-label">Tracked assets</span>
        <span className="stat-value">{total}</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Running (active)</span>
        {/* M6: loose equality — coerces in edge cases */}
        <span className="stat-value">
          {rows.filter((r) => {
            // M6: loose equality — intentional review exercise
            return r.status == 'active'
          }).length}
        </span>
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
