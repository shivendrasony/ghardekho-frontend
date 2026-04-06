import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Grid, List, ChevronDown } from 'lucide-react'
import PropertyCard from '../components/property/PropertyCard'
import api from '../services/api'   // ← ADD

const BHK_OPTS  = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const TYPE_OPTS  = ['Flat', 'House', 'Villa', 'Plot', 'Commercial']
const FURN_OPTS  = ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
const SORT_OPTS  = [
  { label: 'Newest First',       value: 'newest'    },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc'},
  { label: 'Area: Large First',  value: 'area_desc' },
]

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode]       = useState('grid')
  const [sort, setSort]               = useState('newest')

  // ← CHANGE: mock PROPERTIES hataya, real state lagaya
  const [properties, setProperties] = useState([])
  const [total, setTotal]           = useState(0)
  const [loading, setLoading]       = useState(true)

  const [filters, setFilters] = useState({
    city:       searchParams.get('city')     || '',
    type:       searchParams.get('type')     || '',
    propType:   searchParams.get('propType') || '',
    bhk:        [],
    furnishing: [],
    minPrice:   '',
    maxPrice:   '',
  })

  // ← ADD: Backend se properties fetch karo
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const res = await api.get('/properties/', {
          params: {
            city:         filters.city       || undefined,
            listing_type: filters.type       || undefined,
            prop_type:    filters.propType   || undefined,
            bhk:          filters.bhk[0]     || undefined,
            furnishing:   filters.furnishing[0] || undefined,
            min_price:    filters.minPrice   || undefined,
            max_price:    filters.maxPrice   || undefined,
            ordering:
              sort === 'newest'     ? '-created_at' :
              sort === 'price_asc'  ? 'price'       :
              sort === 'price_desc' ? '-price'       :
              sort === 'area_desc'  ? '-area'        : '-created_at',
          }
        })
        setProperties(res.data.results || [])
        setTotal(res.data.count || 0)
      } catch (err) {
        console.error('Error fetching properties:', err)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [filters, sort])

  const toggle = (key, val) =>
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }))

  const clearFilters = () =>
    setFilters({ city:'', type:'', propType:'', bhk:[], furnishing:[], minPrice:'', maxPrice:'' })

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div>
            {loading ? (
              <span className="text-gray-400 text-sm">Loading...</span>
            ) : (
              <>
                <span className="font-semibold text-primary-900">{total} Properties</span>
                <span className="text-gray-400 text-sm ml-2">
                  {filters.city && `in ${filters.city}`} {filters.propType && `· ${filters.propType}`}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')}
                className={`px-3 py-2 transition-colors ${viewMode==='grid' ? 'bg-primary-900 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                <Grid size={15} />
              </button>
              <button onClick={() => setViewMode('list')}
                className={`px-3 py-2 transition-colors ${viewMode==='list' ? 'bg-primary-900 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                <List size={15} />
              </button>
            </div>
            <button onClick={() => setShowFilters(v => !v)}
              className="lg:hidden flex items-center gap-1.5 bg-primary-900 text-white text-sm font-medium px-3 py-2 rounded-lg">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">

        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-28">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-primary-900">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-gold-500 hover:underline font-medium">Clear All</button>
            </div>

            {/* Listing Type */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Listing Type</p>
              <div className="flex gap-2">
                {[{l:'Buy',v:'sell'},{l:'Rent',v:'rent'}].map(({l,v}) => (
                  <button key={v} onClick={() => setFilters(f=>({...f,type:f.type===v?'':v}))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${filters.type===v?'bg-primary-900 text-white border-primary-900':'border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Property Type</p>
              <div className="flex flex-wrap gap-2">
                {TYPE_OPTS.map(t => (
                  <button key={t} onClick={() => setFilters(f=>({...f,propType:f.propType===t?'':t}))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filters.propType===t?'bg-primary-900 text-white border-primary-900':'border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">BHK</p>
              <div className="flex flex-wrap gap-2">
                {BHK_OPTS.map(b => (
                  <button key={b} onClick={() => toggle('bhk', b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filters.bhk.includes(b)?'bg-gold-500 text-white border-gold-500':'border-gray-200 text-gray-600 hover:border-gold-300'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Budget (Rs.)</p>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={filters.minPrice}
                  onChange={e => setFilters(f=>({...f,minPrice:e.target.value}))}
                  className="input-field text-xs" />
                <input type="number" placeholder="Max" value={filters.maxPrice}
                  onChange={e => setFilters(f=>({...f,maxPrice:e.target.value}))}
                  className="input-field text-xs" />
              </div>
            </div>

            {/* Furnishing */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Furnishing</p>
              <div className="flex flex-col gap-2">
                {FURN_OPTS.map(f => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={filters.furnishing.includes(f)}
                      onChange={() => toggle('furnishing', f)} className="rounded accent-primary-700" />
                    <span className="text-sm text-gray-600">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-5 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-primary-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <p className="text-sm text-gray-500">Use desktop view for full filters panel</p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="flex-1">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="skeleton h-48 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                    <div className="skeleton h-5 w-1/3 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && properties.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🏚️</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && properties.length > 0 && (
            <div className={viewMode==='grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
              : 'flex flex-col gap-4'}>
              {properties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}