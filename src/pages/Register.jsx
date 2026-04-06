import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Home, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'   // ← ADD

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', role:'buyer', rera:'' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.phone || !form.password) { setError('Please fill all required fields'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)

    // ← CHANGE: mock hataya, real Django API lagaya
    try {
      const res = await api.post('/auth/register/', {
        name:        form.name,
        email:       form.email,
        phone:       form.phone,
        password:    form.password,
        password2:   form.password,
        role:        form.role,
        agency:      '',
        rera_number: form.rera || '',
      })
      login({
        ...res.data.user,
        token:   res.data.access,
        refresh: res.data.refresh,
      })
      navigate('/')
    } catch (err) {
      const data = err.response?.data
      if (data?.email)    setError('Email: ' + data.email[0])
      else if (data?.phone)    setError('Phone: ' + data.phone[0])
      else if (data?.password) setError('Password: ' + data.password[0])
      else setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { value:'buyer', label:'Buyer / Tenant', desc:'I want to buy or rent a property', emoji:'🏠' },
    { value:'owner', label:'Property Owner', desc:'I want to sell or rent my property', emoji:'🔑' },
    { value:'agent', label:'Real Estate Agent', desc:'I am a professional real estate agent', emoji:'👔' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center">
              <Home size={20} className="text-gold-400"/>
            </div>
            <span className="text-2xl font-display font-bold text-primary-900">Ghar<span className="text-gold-500">Dekho</span></span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-primary-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join lakhs of Indians finding their dream home</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map(r => (
                  <button type="button" key={r.value} onClick={() => setForm(f=>({...f,role:r.value}))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${form.role===r.value?'border-primary-900 bg-primary-50':'border-gray-200 hover:border-gray-300'}`}>
                    <div className="text-2xl mb-1">{r.emoji}</div>
                    <p className={`text-xs font-semibold ${form.role===r.value?'text-primary-900':'text-gray-700'}`}>{r.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input type="text" placeholder="Rahul Sharma"
                  value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))}
                  className="input-field" required/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input type="tel" placeholder="98765 43210"
                  value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))}
                  className="input-field" required/>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))}
                className="input-field" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <div className="relative">
                <input type={showPw?'text':'password'} placeholder="Minimum 6 characters"
                  value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))}
                  className="input-field pr-10" required/>
                <button type="button" onClick={() => setShowPw(v=>!v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {form.role === 'agent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">RERA Registration Number</label>
                <input type="text" placeholder="e.g. P51800047290"
                  value={form.rera} onChange={e => setForm(f=>({...f,rera:e.target.value}))}
                  className="input-field"/>
                <p className="text-xs text-gray-400 mt-1">Required for agent verification badge</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                       : <><UserPlus size={16}/> Create Account</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-500 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}