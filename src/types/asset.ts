export type AssetStatus = 'active' | 'idle' | 'error'

export type AssetRow = {
  id: string
  name: string
  region: string
  status: AssetStatus
  /** Optional — may be missing on some rows */
  notes?: string
}
