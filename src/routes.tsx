import { Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import RepoDetails from './pages/RepoDetails'
import NotFound from './pages/NotFound'
import Favorites from './pages/Favorites'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="repo/:owner/:name" element={<RepoDetails />} />
        <Route path="favorites" element={<Favorites />} />
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
