import { useState } from 'react'
import {
  LayoutDashboard, ListChecks, Users, FileText,
  BadgeCheck, Trash2, Eye, TrendingUp, Home,
  AlertCircle, CheckCircle2, XCircle, Search
} from 'lucide-react'
import { PROPERTIES } from '../utils/mockData'
import { formatPrice } from '../utils/helpers'

const TABS = [
  { id: 'overview',  label: 'Overview',    icon: LayoutDashboard },
  { id: 'listings',  label: 'Listings',    icon: ListChecks      },
  { id: 'users',     label: 'Users',       icon: Users           },
  { id: 'blog',      label: 'Blog Posts',  icon: FileText        },
]

const MOCK_USERS = [
  { id: 1, name: 'Rajesh Sharma',  email: 'rajesh@email.com',  role: 'agent',  status: 'active',  joined: '2024-01-10', listings: 12 },
  { id: 2, name: 'Priya Nair',     email: 'priya@email.com',   role: 'agent',  status: 'active',  joined: '2024-01-15', listings: 8  },
  { id: 3, name: 'Amit Kumar',     email: 'amit@email.com',    role: 'buyer',  status: 'active',  joined: '2024-02-01', listings: 0  },
  { id: 4, name: 'Sneha Joshi',    email: 'sneha@email.com',   role: 'owner',  status: 'banned',  joined: '2024-02-10', listings: 2  },
  { id: 5, name: 'Rohit Verma',    email: 'rohit@email.com',   role: 'agent',  status: 'pending', joined: '2024-03-01', listings: 0  },
  { id: 6, name: 'Kavita Reddy',   email: 'kavita@email.com',  role: 'buyer',  status: 'active',  joined: '2024-03-05', listings: 0  },
]

const PENDING_LISTINGS = PROPERTIES.slice(0, 3).map(p => ({ ...p, adminStatus: 'pending' }))
const BLOG_POSTS = [
  { id: 1, title: 'Best Areas to Invest in Patna 2024', status: 'published', author: 'Vikram Mehta', date: '2024-03-15', views: 1842 },
  { id: 2, title: 'First-Time Home Buyer Guide India',  status: 'published', author: 'Priya Nair',   date: '2024-03-10', views: 3204 },
  { id: 3, title: 'Mumbai Market Trends 2024',          status: 'draft',     author: 'Rajesh Sharma',date: '2024-03-08', views: 0    },
  { id: 4, title: 'RERA Explained for Buyers',          status: 'published', author: 'Sneha Joshi',  date: '2024-02-28', views: 2100 },
]

export default function AdminDashboard() {
  const [tab, setTab]         = useState('overview')
  const [userSearch, setUserSearch] = useState('')
  const [listings, setListings]     = useState(PENDING_LISTINGS)
  const [users, setUsers]           = useState(MOCK_USERS)

  const approveL = id => setListings(l => l.map(x => x.id === id ? { ...x, adminStatus: 'approved' } : x))
  const rejectL  = id => setListings(l => l.map(x => x.id === id ? { ...x, adminStatus: 'rejected' } : x))
  const banUser  = id => setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'banned' ? 'active' : 'banned' } : x))

  const filteredUsers = users.filter(u =>
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  const statusBadge = s => ({
    active:  'bg-green-100 text-green-700',
    banned:  'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700',
    published:'bg-green-100 text-green-700',
    draft:   'bg-gray-100 text-gray-700',
    approved:'bg-green-100 text-green-700',
    rejected:'bg-red-100 text-red-700',
  }[s] || 'bg-gray-100 text-gray-700')

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary-900">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage listings, users, and platform content</p>
          </div>
          <span className="badge bg-red-100 text-red-700 gap-1">
            <AlertCircle size={13} /> Admin Access
          </span>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Listings',   value: '1,24,832', icon: Home,        color: 'text-blue-500 bg-blue-50',   change: '+342 today'  },
            { label: 'Registered Users', value: '85,412',   icon: Users,       color: 'text-green-500 bg-green-50', change: '+128 today'  },
            { label: 'Pending Reviews',  value: '34',       icon: AlertCircle, color: 'text-amber-500 bg-amber-50', change: 'Needs action'},
            { label: 'Monthly Revenue',  value: '₹ 12.4L',  icon: TrendingUp,  color: 'text-purple-500 bg-purple-50',change: '+18% MoM'   },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold text-primary-900">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{change}</p>
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
            {/* Pending Listings */}
            <div className="card p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-primary-900">Pending Verifications</h3>
                <span className="badge bg-amber-100 text-amber-700">{listings.filter(l => l.adminStatus === 'pending').length} pending</span>
              </div>
              <div className="space-y-3">
                {listings.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900 truncate">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.city} · {formatPrice(p.price, p.listingType)}</p>
                    </div>
                    {p.adminStatus === 'pending' ? (
                      <div className="flex gap-1">
                        <button onClick={() => approveL(p.id)}
                          className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><CheckCircle2 size={15} /></button>
                        <button onClick={() => rejectL(p.id)}
                          className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><XCircle size={15} /></button>
                      </div>
                    ) : (
                      <span className={`badge text-xs ${statusBadge(p.adminStatus)}`}>{p.adminStatus}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-4">Recent Registrations</h3>
              <div className="space-y-3">
                {MOCK_USERS.slice(0, 5).map(u => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shrink-0">
                      {u.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900">{u.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{u.role} · joined {u.joined}</p>
                    </div>
                    <span className={`badge text-xs capitalize ${statusBadge(u.status)}`}>{u.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="card p-5 lg:col-span-2">
              <h3 className="font-semibold text-primary-900 mb-4">Platform Health</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Verified Listings',   value: '98,420', pct: '79%', color: 'bg-green-500' },
                  { label: 'Active Agents',        value: '12,048', pct: '89%', color: 'bg-blue-500'  },
                  { label: 'Leads This Month',     value: '48,302', pct: '94%', color: 'bg-purple-500'},
                  { label: 'Avg. Response Time',   value: '2.4 hrs', pct: '76%', color: 'bg-amber-500'},
                ].map(({ label, value, pct, color }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-lg font-bold text-primary-900">{value}</p>
                    <p className="text-xs text-gray-400 mb-2">{label}</p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: pct }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{pct} target</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings Management */}
        {tab === 'listings' && (
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2 className="text-lg font-semibold text-primary-900">All Listings</h2>
              <div className="flex gap-2 text-xs flex-wrap">
                {['All', 'Pending', 'Approved', 'Rejected', 'Featured'].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-primary-300">{f}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {['Property', 'City', 'Price', 'Type', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PROPERTIES.map((p, i) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          <p className="font-medium text-primary-900 text-xs truncate max-w-[180px]">{p.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{p.city}</td>
                      <td className="px-4 py-3 text-gold-600 font-semibold text-xs">{formatPrice(p.price, p.listingType)}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{p.type}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-xs ${i % 3 === 0 ? 'bg-amber-100 text-amber-700' : p.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {i % 3 === 0 ? 'Pending' : p.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={13} /></button>
                          <button className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg"><CheckCircle2 size={13} /></button>
                          <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management */}
        {tab === 'users' && (
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2 className="text-lg font-semibold text-primary-900">Registered Users</h2>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={userSearch} onChange={e => setUserSearch(e.target.value)}
                  placeholder="Search users..." className="input-field pl-9 py-2 text-sm w-52" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {['User', 'Role', 'Listings', 'Joined', 'Status', 'Action'].map(h => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 font-bold text-xs shrink-0">
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-primary-900 text-xs">{u.name}</p>
                            <p className="text-gray-400 text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-xs text-gray-600">{u.role}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{u.listings}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{u.joined}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-xs capitalize ${statusBadge(u.status)}`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => banUser(u.id)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                            u.status === 'banned' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-500 hover:bg-red-100'
                          }`}>
                          {u.status === 'banned' ? 'Unban' : 'Ban'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Management */}
        {tab === 'blog' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-primary-900">Blog Posts</h2>
              <button className="btn-primary text-sm py-2">+ New Post</button>
            </div>
            <div className="space-y-4">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary-900 text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">By {post.author} · {post.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {post.status === 'published' && (
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Eye size={11} /> {post.views.toLocaleString('en-IN')} views</p>
                    )}
                    <span className={`badge text-xs ${statusBadge(post.status)}`}>{post.status}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={14} /></button>
                      <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
