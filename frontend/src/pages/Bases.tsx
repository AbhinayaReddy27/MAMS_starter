
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

type Base = { _id: string; code: string; name: string; location?: { address?: string } }

export default function Bases() {
  const [data, setData] = useState<Base[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiGet('/bases').then(setData).catch(e => setError(String(e))).finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Bases</h2>
      <ul>
        {data.map(b => (
          <li key={b._id}><strong>{b.code}</strong> — {b.name} {b.location?.address ? `(${b.location.address})` : ''}</li>
        ))}
      </ul>
    </div>
  )
}
