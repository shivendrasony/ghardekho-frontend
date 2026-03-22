import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Home, ChevronDown, User, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white shadow-md'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-primary-900'
  const logoColor = isHome && !scrolled ? 'text-gold-400' : 'text-gold-500'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isHome && !scrolled ? 'bg-gold-400' : 'bg-primary-900'}`}>
              <Home size={16} className="text-white" />
            </div>
            <span className={`text-xl font-display font-bold ${logoColor}`}>
              Ghar<span className={isHome && !scrolled ? 'text-white' : 'text-primary-900'}>Dekho</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Buy',        to: '/search?type=sell' },
              { label: 'Rent',       to: '/search?type=rent' },
              { label: 'Plots',      to: '/search?propType=Plot' },
              { label: 'Commercial', to: '/search?propType=Commercial' },
              { label: 'About',      to: '/about' },
            ].map(({ label, to }) => (
              <Link key={label} to={to}
                className={`text-sm font-medium hover:text-gold-500 transition-colors ${textColor}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/post-property"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              <PlusCircle size={15} />
              Post Property
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(v => !v)}
                  className={`flex items-center gap-2 text-sm font-medium ${textColor} hover:text-gold-500`}>
                  <div className="w-8 h-8 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold text-xs">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span>{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-slide-down">
                    <Link to={user?.role === 'agent' ? '/dashboard/agent' : '/dashboard/buyer'}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}>
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link to="/post-property"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}>
                      <PlusCircle size={15} /> Post Property
                    </Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full">
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    isHome && !scrolled
                      ? 'text-white hover:bg-white/10'
                      : 'text-primary-900 hover:bg-gray-100'
                  }`}>
                  Login
                </Link>
                <Link to="/register"
                  className={`text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-colors ${
                    isHome && !scrolled
                      ? 'border-white text-white hover:bg-white hover:text-primary-900'
                      : 'border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'
                  }`}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden ${textColor}`} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
          <div className="px-4 py-4 flex flex-col gap-3">
            {[
              { label: 'Buy',        to: '/search?type=sell' },
              { label: 'Rent',       to: '/search?type=rent' },
              { label: 'Plots',      to: '/search?propType=Plot' },
              { label: 'About',      to: '/about' },
            ].map(({ label, to }) => (
              <Link key={label} to={to}
                className="text-primary-900 font-medium py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link to="/post-property"
              className="btn-primary text-center mt-2"
              onClick={() => setMenuOpen(false)}>
              + Post Property Free
            </Link>
            {!isLoggedIn && (
              <div className="flex gap-2">
                <Link to="/login" className="btn-outline flex-1 text-center" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-secondary flex-1 text-center" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-red-500 font-medium text-left py-2">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
