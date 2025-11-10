
import { Link, Route, Routes } from 'react-router-dom'
import Bases from './pages/Bases'
import Assets from './pages/Assets'
import Transfers from './pages/Transfers'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: 16 }}>
      <h1>MAMS Dashboard</h1>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/bases">Bases</Link>
        <Link to="/assets">Assets</Link>
        <Link to="/transfers">Transfers</Link>
      </nav>
      <Routes>
        <Route path="/" element={<p>Welcome to the Military Asset Management System</p>} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/transfers" element={<Transfers />} />
      </Routes>
    </div>
  )
}
