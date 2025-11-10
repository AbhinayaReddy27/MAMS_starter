
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

type Transfer = { _id: string; status: string; createdAt: string }

export default function Transfers() {
  const [data, setData] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    setLoading(true)
    apiGet('/transfers').then(setData).catch(e => setError(String(e))).finally(() => setLoading(false))
  }

  useEffect(() => { refresh() }, [])

  const createDraft = async () => {
    try {
      await apiPost('/transfers', { fromBaseId: 'TODO', toBaseId: 'TODO', items: [] })
      refresh()
    } catch (e) {
      setError(String(e))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Transfers</h2>
      <button onClick={createDraft}>Create Draft (demo)</button>
      <ul>
        {data.map(t => (
          <li key={t._id}>{t._id} — {t.status} — {new Date(t.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}
