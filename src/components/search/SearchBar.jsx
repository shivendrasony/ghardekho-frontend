import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Home, Building2, Landmark } from 'lucide-react'
import { CITIES } from '../../utils/mockData'

const TABS = [
  { label: 'Buy',   icon: Home,      value: 'sell' },
  { label: 'Rent',  icon: Building2, value: 'rent' },
  { label: 'Plots', icon: Landmark,  value: 'plot' },
]

export default function SearchBar() {
  const [tab,  setTab]  = useState('sell')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (tab  !== 'plot') params.set('type', tab)
    else params.set('propType', 'Plot')
    if (city) params.set('city', city)
    if (type) params.set('propType', type)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-2 w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-3 px-1 pt-1">
        {TABS.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === value
                ? 'bg-primary-900 text-white shadow'
                : 'text-gray-500 hover:bg-gray-100'
            }`}>
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-2 px-1 pb-1">
        {/* City */}
        <div className="flex-1 relative">
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            className="input-field pl-9 appearance-none cursor-pointer">
            <option value="">Select City</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Property Type */}
        {tab !== 'plot' && (
          <div className="flex-1 relative">
            <Home size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="input-field pl-9 appearance-none cursor-pointer">
              <option value="">Property Type</option>
              {['Flat', 'House', 'Villa', 'Commercial'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md whitespace-nowrap">
          <Search size={16} />
          Search
        </button>
      </div>
    </div>
  )
}
