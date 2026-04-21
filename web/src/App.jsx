import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Taxonomy from './pages/Taxonomy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/taxonomy" element={<Taxonomy />} />
      </Routes>
    </BrowserRouter>
  )
}
