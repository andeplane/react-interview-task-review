/* eslint-disable @typescript-eslint/no-unsafe-assignment -- PR exercise: trust JSON without validation */
import { useEffect, useState } from 'react'

export type PollStats = {
  active: number
  errors: number
  idle: number
  total: number
}

/**
 * PR review issues (intentional):
 * - `setInterval` is never cleared → leaks on unmount / Strict Mode double-mount.
 * - `filter` is captured in the interval callback but missing from deps → stale URL/query.
 * - Response body is trusted: `as PollStats` with no runtime validation.
 */
export function usePollStats(filter: 'all' | 'active') {
  const [stats, setStats] = useState<PollStats | null>(null)

  useEffect(() => {
    const tick = () => {
      void (async () => {
        const res = await fetch(`/mock-stats.json?filter=${filter}`)
        const json = await res.json()
        setStats(json as PollStats)
      })()
    }

    tick()
    window.setInterval(tick, 6000)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- PR exercise: stale filter + missing cleanup
  }, [])

  return stats
}
