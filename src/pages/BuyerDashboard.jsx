import { useState } from 'react'
import { Heart, Bell, MessageSquare, User, Settings, Home, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PropertyCard from '../components/property/PropertyCard'
import { PROPERTIES } from '../utils/mockData'

const TABS = [
  { id: 'saved',    label: 'Saved',    icon: Heart },
  { id: 'inquiries',label: 'Inquiries',icon: MessageSquare },
  { id: 'alerts',   label: 'Alerts',   icon: Bell },
  { id: 'profile',  label: 'Profile',  icon: User },
]

export default function BuyerDashboard() {
  const [tab, setTab]       = useState('saved')
  const { user, logout }    = useAuth()
  const saved               = PROPERTIES.slice(0, 3)
  const [alerts, setAlerts] = useState([
    { id: 1, city: 'Mumbai', type: 'Flat', bhk: '2 BHK', maxPrice: '1 Cr', active: true },
    { id: 2, city: 'Pune',   type: 'Villa',bhk: '3 BHK', maxPrice: '80 Lakh', active: false },
  ])

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-900 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-primary-900">Hello, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-outline text-sm">Logout</button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Saved',     value: saved.length, icon: Heart,         color: 'text-red-500 bg-red-50'    },
            { label: 'Inquiries', value: 4,            icon: MessageSquare, color: 'text-blue-500 bg-blue-50'  },
            { label: 'Alerts',    value: alerts.length,icon: Bell,           color: 'text-amber-500 bg-amber-50'},
            { label: 'Viewed',    value: 12,           icon: Home,           color: 'text-green-500 bg-green-50'},
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-900">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === id ? 'bg-white shadow text-primary-900' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'saved' && (
          <div>
            <h2 className="text-lg font-semibold text-primary-900 mb-4">Saved Properties</h2>
            {saved.length > 0
              ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {saved.map(p => <PropertyCard key={p.id} property={p} />)}
                </div>
              : <div className="text-center py-16 text-gray-400">
                  <Heart size={48} className="mx-auto mb-3" />
                  <p>No saved properties yet. Start browsing!</p>
                </div>
            }
          </div>
        )}

        {tab === 'inquiries' && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">My Inquiries</h2>
            <div className="space-y-4">
              {PROPERTIES.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img src={p.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 text-sm truncate">{p.title}</p>
                    <p className="text-xs text-gray-400">{p.locality}, {p.city}</p>
                    <p className="text-xs text-gold-500 font-semibold mt-1">{['Contacted', 'Site Visit Scheduled', 'Awaiting Reply', 'Offer Made'][i]}</p>
                  </div>
                  <span className={`badge text-xs ${['bg-blue-100 text-blue-700','bg-green-100 text-green-700','bg-amber-100 text-amber-700','bg-purple-100 text-purple-700'][i]}`}>
                    {['Active', 'Scheduled', 'Pending', 'Negotiating'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'alerts' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary-900">Property Alerts</h2>
              <button className="btn-primary text-sm py-2">+ New Alert</button>
            </div>
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-primary-900 text-sm">{alert.bhk} {alert.type} in {alert.city}</p>
                    <p className="text-xs text-gray-400">Budget: up to ₹ {alert.maxPrice}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <div onClick={() => setAlerts(a => a.map(al => al.id === alert.id ? {...al, active: !al.active} : al))}
                        className={`w-10 h-5 rounded-full transition-colors relative ${alert.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${alert.active ? 'left-5' : 'left-0.5'}`} />
                      </div>
                    </label>
                    <button onClick={() => setAlerts(a => a.filter(al => al.id !== alert.id))}
                      className="text-red-400 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="card p-6 max-w-lg">
            <h2 className="text-lg font-semibold text-primary-900 mb-5">Profile Settings</h2>
            <div className="space-y-4">
              {[
                { label: 'Full Name',  val: user?.name,  type: 'text'  },
                { label: 'Email',      val: user?.email, type: 'email' },
                { label: 'Phone',      val: '9876543210',type: 'tel'   },
                { label: 'City',       val: 'Mumbai',    type: 'text'  },
              ].map(({ label, val, type }) => (
                <div key={label}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
                  <input type={type} defaultValue={val} className="input-field" />
                </div>
              ))}
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
