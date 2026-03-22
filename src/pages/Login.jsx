import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Home, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill all fields'); return }
    setLoading(true)
    // Simulate API call — replace with real Django API later
    await new Promise(r => setTimeout(r, 800))
    const mockUser = { name: 'Demo User', email: form.email, role: 'buyer', token: 'mock-token-123' }
    login(mockUser)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
              <Home size={20} className="text-gold-400"/>
            </div>
            <span className="text-2xl font-display font-bold text-primary-900">Ghar<span className="text-gold-500">Dekho</span></span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-primary-900">Welcome back!</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))}
                className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw?'text':'password'} placeholder="Enter your password"
                  value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))}
                  className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPw(v=>!v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-primary-700"/>
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-gold-500 hover:underline font-medium">Forgot password?</a>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              ) : (
                <><LogIn size={16}/> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-500 font-semibold hover:underline">Register here</Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a> and{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
