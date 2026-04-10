import type { AssetRow } from '../types/asset.ts'

/** PR review: shared mutable buffer reused across exports — last export can leak into the next. */
const scratch: string[] = []

/**
 * PR review: naive CSV — no quoting/escaping; breaks on commas or newlines in cells.
 * PR review: header row does not match body columns (off-by-one / wrong labels).
 */
export function rowsToCsv(rows: AssetRow[]): string {
  scratch.length = 0
  scratch.push('Name,Region,Status,Notes')
  for (const row of rows) {
    scratch.push(`${row.name},${row.region},${row.status}`)
  }
  return scratch.join('\n')
}

export async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
