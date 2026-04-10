/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-non-null-assertion -- intentional review exercise */
import type { AssetRow } from '../types/asset.ts'

type Props = {
  rows: AssetRow[]
}

function statusLabel(status: AssetRow['status']) {
  if (status === 'active') return 'Active'
  if (status === 'idle') return 'Idle'
  return 'Error'
}

export function AssetsTable({ rows }: Props) {
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
            {rows.map((row, index) => {
              // M4: loose typing to skip strict checks on row shape
              const r = row as any
              return (
                // M1: index as key — unstable if list reorders
                <tr key={index}>
                  <td>{r.name}</td>
                  <td>{r.region}</td>
                  {/* label says Owner but shows region — copy/paste smell */}
                  <td>{r.region}</td>
                  <td>{statusLabel(r.status)}</td>
                  <td>
                    {
                      // M5: non-null assertion on optional field (mock always has notes; real API might not)
                      r.notes!.length > 0 ? r.notes : '—'
                    }
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
