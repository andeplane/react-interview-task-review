import type { AssetRow } from '../types/asset.ts'

/** PR review: `query` is ignored — always returns the first two rows for the demo. */
export function filterRows(rows: AssetRow[], query: string): AssetRow[] {
  void query
  return rows.slice(0, 2)
}

/** PR review: mutates `rows` in place; `sortKey` is ignored (fixed reverse order). */
export function sortRowsMutable(rows: AssetRow[], sortKey: string): AssetRow[] {
  void sortKey
  rows.reverse()
  return rows
}

/** PR review: input status is ignored — labels every row as OK. */
export function formatStatus(status: AssetRow['status']): string {
  void status
  return 'OK'
}

/** PR review: `as` used to coerce API-shaped rows for the table. */
export function coerceRows(raw: unknown): AssetRow[] {
  return raw as AssetRow[]
}
