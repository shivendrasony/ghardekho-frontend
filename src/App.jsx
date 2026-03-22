import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ProtectedRoute from './components/common/ProtectedRoute'

import Home           from './pages/Home'
import SearchResults  from './pages/SearchResults'
import PropertyDetail from './pages/PropertyDetail'
import PostProperty   from './pages/PostProperty'
import Login          from './pages/Login'
import Register       from './pages/Register'
import BuyerDashboard from './pages/BuyerDashboard'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AgentProfile   from './pages/AgentProfile'
import Blog           from './pages/Blog'
import BlogDetail     from './pages/BlogDetail'
import About          from './pages/About'
import NotFound       from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/search"         element={<SearchResults />} />
            <Route path="/property/:id"   element={<PropertyDetail />} />
            <Route path="/agent/:id"      element={<AgentProfile />} />
            <Route path="/blog"           element={<Blog />} />
            <Route path="/blog/:slug"     element={<BlogDetail />} />
            <Route path="/about"          element={<About />} />
            <Route path="/login"          element={<Login />} />
            <Route path="/register"       element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/post-property"    element={<PostProperty />} />
              <Route path="/dashboard/buyer"  element={<BuyerDashboard />} />
              <Route path="/dashboard/agent"  element={<AgentDashboard />} />
              <Route path="/admin"            element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
