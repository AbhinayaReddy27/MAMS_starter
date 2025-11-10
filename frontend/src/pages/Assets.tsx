
import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

type Asset = { _id: string; nsn: string; name: string; category?: string }

export default function Assets() {
  const [data, setData] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiGet('/assets').then(setData).catch(e => setError(String(e))).finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Assets</h2>
      <ul>
        {data.map(a => (
          <li key={a._id}><strong>{a.nsn}</strong> — {a.name} {a.category ? `(${a.category})` : ''}</li>
        ))}
      </ul>
    </div>
  )
}
