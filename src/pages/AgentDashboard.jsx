import { useState } from 'react'
import { LayoutDashboard, ListChecks, Users, TrendingUp, PlusCircle, Eye, MessageSquare, BadgeCheck, Trash2, Edit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PROPERTIES } from '../utils/mockData'
import { formatPrice } from '../utils/helpers'

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'listings',  label: 'Listings',  icon: ListChecks      },
  { id: 'leads',     label: 'Leads',     icon: Users           },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp      },
]

export default function AgentDashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab]    = useState('overview')
  const myListings       = PROPERTIES.slice(0, 5)
  const leads = [
    { name: 'Amit Singh',   phone: '9876543210', property: PROPERTIES[0].title, time: '2 hrs ago',  status: 'New'      },
    { name: 'Priya Sharma', phone: '9765432109', property: PROPERTIES[1].title, time: '5 hrs ago',  status: 'Followed' },
    { name: 'Rahul Gupta',  phone: '9654321098', property: PROPERTIES[2].title, time: '1 day ago',  status: 'Visit Set'},
    { name: 'Sneha Joshi',  phone: '9543210987', property: PROPERTIES[3].title, time: '2 days ago', status: 'Closed'   },
  ]
  const statusColor = { New: 'bg-blue-100 text-blue-700', Followed: 'bg-amber-100 text-amber-700', 'Visit Set': 'bg-green-100 text-green-700', Closed: 'bg-purple-100 text-purple-700' }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-bold text-primary-900">{user?.name || 'Agent Dashboard'}</h1>
                <span className="badge bg-green-100 text-green-700 gap-1"><BadgeCheck size={12} /> Verified Agent</span>
              </div>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/post-property" className="flex items-center gap-1.5 btn-primary text-sm">
              <PlusCircle size={15} /> Post Property
            </Link>
            <button onClick={logout} className="btn-outline text-sm">Logout</button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: '5',  icon: ListChecks,    color: 'text-blue-500 bg-blue-50'  },
            { label: 'Total Leads',     value: '28', icon: Users,          color: 'text-green-500 bg-green-50'},
            { label: 'Total Views',     value: '1.4k',icon: Eye,           color: 'text-amber-500 bg-amber-50'},
            { label: 'Deals Closed',    value: '7',  icon: TrendingUp,     color: 'text-purple-500 bg-purple-50'},
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
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto scrollbar-hide w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                tab === id ? 'bg-white shadow text-primary-900' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-4">Recent Leads</h3>
              <div className="space-y-3">
                {leads.slice(0, 3).map(l => (
                  <div key={l.name} className="flex items-center justify-between gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shrink-0">
                      {l.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900">{l.name}</p>
                      <p className="text-xs text-gray-400 truncate">{l.property}</p>
                    </div>
                    <span className={`badge text-xs ${statusColor[l.status]}`}>{l.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-4">Top Performing Listings</h3>
              <div className="space-y-3">
                {myListings.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900 truncate">{p.title}</p>
                      <p className="text-xs text-gold-500 font-semibold">{formatPrice(p.price, p.listingType)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-primary-900">{[142, 98, 67][i]} views</p>
                      <p className="text-xs text-gray-400">{[12, 8, 5][i]} leads</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        {tab === 'listings' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-primary-900">My Listings</h2>
              <div className="flex gap-2 text-xs">
                {['All', 'Active', 'Pending', 'Expired'].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-900 transition-colors">{f}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {myListings.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img src={p.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 text-sm truncate">{p.title}</p>
                    <p className="text-xs text-gray-400">{p.locality}, {p.city}</p>
                    <p className="text-xs font-semibold text-gold-500 mt-1">{formatPrice(p.price, p.listingType)}</p>
                  </div>
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Eye size={12} /> {[142,98,67,45,30][i]}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MessageSquare size={12} /> {[12,8,5,3,2][i]}
                    </div>
                  </div>
                  <span className={`badge text-xs ${i < 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {i < 4 ? 'Active' : 'Pending'}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={15} /></button>
                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads */}
        {tab === 'leads' && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-5">Buyer Leads</h2>
            <div className="space-y-4">
              {leads.map(l => (
                <div key={l.name} className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {l.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 text-sm">{l.name}</p>
                    <p className="text-xs text-gray-400">{l.phone} · {l.time}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">Interested in: {l.property}</p>
                  </div>
                  <span className={`badge text-xs ${statusColor[l.status]}`}>{l.status}</span>
                  <a href={`tel:+91${l.phone}`} className="flex items-center gap-1.5 bg-primary-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                    📞 Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {tab === 'analytics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Total Views This Month',    value: '1,432', change: '+18%', positive: true  },
              { label: 'Leads Generated',           value: '28',    change: '+32%', positive: true  },
              { label: 'Avg. Response Time',        value: '2.4 hrs',change: '-12%',positive: true  },
              { label: 'Listings Conversion Rate',  value: '6.2%',  change: '+0.8%',positive: true  },
            ].map(({ label, value, change, positive }) => (
              <div key={label} className="card p-6">
                <p className="text-sm text-gray-500 mb-2">{label}</p>
                <p className="text-3xl font-display font-bold text-primary-900 mb-1">{value}</p>
                <p className={`text-xs font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
                  {change} vs last month
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
