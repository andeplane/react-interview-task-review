/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-non-null-assertion -- intentional review exercise */
import type { AssetRow } from '../types/asset.ts'
import { coerceRows, formatStatus } from '../utils/tableHelpers.ts'

type Props = {
  rows: AssetRow[]
}

export function AssetsTable({ rows }: Props) {
  const coerced = coerceRows(rows as unknown)
  const withoutRegion = coerced.filter((r) => r.region !== 'SE')
  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Assets</h2>
        <p className="panel-sub">Live snapshot</p>
      </header>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {withoutRegion.map((row, index) => {
              const r = row as any
              return (
                <tr key={index}>
                  <td>{r.name}</td>
                  <td>{r.region}</td>
                  <td>{r.region}</td>
                  <td>{formatStatus(r.status)}</td>
                  <td>
                    {r.notes!.length > 0 ? r.notes : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
