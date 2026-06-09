import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

/**
 * Root application shell. Routing is wired now so future pages
 * (admissions, model, contact) can be added without restructuring.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
