import type { AssetRow } from '../types/asset.ts'

export const MOCK_ASSETS: AssetRow[] = [
  {
    id: 'a-1',
    name: 'Pump North',
    region: 'NO',
    status: 'active',
    notes: 'Primary',
  },
  {
    id: 'a-2',
    name: 'Valve East',
    region: 'SE',
    status: 'idle',
    notes: '',
  },
  {
    id: 'a-3',
    name: 'Sensor 12',
    region: 'DK',
    status: 'error',
    notes: 'Calibrate',
  },
  {
    id: 'a-4',
    name: 'Compressor',
    region: 'NO',
    status: 'active',
    notes: 'Spare',
  },
]

export function summarizeAssets(rows: AssetRow[]) {
  const active = rows.filter((r) => r.status === 'active').length
  const errors = rows.filter((r) => r.status === 'error').length
  const idle = rows.filter((r) => r.status === 'idle').length
  return { active, errors, idle, total: rows.length }
}
