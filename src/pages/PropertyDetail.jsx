import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, BedDouble, Maximize2, BadgeCheck, Phone, MessageCircle, Heart, Share2, ChevronLeft, ChevronRight, ShieldCheck, Layers, Sofa, Building, Calendar } from 'lucide-react'
import api from '../services/api'   // ← ADD
import PropertyCard from '../components/property/PropertyCard'
import { formatPrice, formatArea, getTypeBadgeColor } from '../utils/helpers'

const AMENITY_ICONS = { 'Parking':'🚗','Gym':'💪','Swimming Pool':'🏊','Lift':'🛗','Security':'🔒','Power Backup':'⚡','Club House':'🏛️','Garden':'🌿','Kids Play Area':'🛝','CCTV':'📷','Home Theatre':'🎬','Wine Cellar':'🍷','Solar Power':'☀️','EV Charging':'🔌','Corner Plot':'📐','Wide Road':'🛣️','24/7 Security':'🔐','Gated Colony':'🚧','Rain Water Harvesting':'💧' }

export default function PropertyDetail() {
  const { id } = useParams()

  // ← CHANGE: mock data hataya, real API lagaya
  const [property, setProperty]   = useState(null)
  const [similar,  setSimilar]    = useState([])
  const [loading,  setLoading]    = useState(true)
  const [imgIndex, setImgIndex]   = useState(0)
  const [saved,    setSaved]      = useState(false)
  const [showContact, setShowContact] = useState(false)

  // ← ADD: Property fetch karo
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/properties/${id}/`)
        setProperty(res.data)

        // Similar properties fetch karo
        const simRes = await api.get('/properties/', {
          params: { city: res.data.city, page: 1 }
        })
        setSimilar(
          (simRes.data.results || [])
            .filter(p => p.id !== res.data.id)
            .slice(0, 3)
        )
      } catch (err) {
        console.error('Error fetching property:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  // ← ADD: Save/Unsave toggle
  const handleSave = async () => {
    try {
      const res = await api.post(`/properties/${id}/save/`)
      setSaved(res.data.saved)
    } catch {
      setSaved(v => !v) // fallback toggle
    }
  }

  // Loading state
  if (loading) return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="skeleton h-96 rounded-2xl" />
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <div className="skeleton h-6 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-8 w-1/3 rounded" />
            </div>
          </div>
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  )

  // Not found
  if (!property) return (
    <div className="pt-24 text-center py-20">
      <div className="text-6xl mb-4">🏚️</div>
      <h2 className="text-2xl font-semibold text-primary-900 mb-4">Property not found</h2>
      <Link to="/search" className="btn-primary inline-block">Browse Properties</Link>
    </div>
  )

  // ← CHANGE: Backend response structure use karo
  const {
    title, prop_type: type, listing_type: listingType,
    price, area, bhk, floor, age, furnishing,
    city, locality, address, description,
    amenities = [], images = [],
    owner, is_verified: verified, created_at: postedAt,
    rera_number: rera,
  } = property

  // Images array — backend se URLs aate hain
  const imageList = images.length > 0
    ? images.map(img => img.image)
    : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80']

  // Amenities — backend se array of {name} objects aata hai
  const amenityNames = amenities.map ? amenities : []

  // timeAgo helper
  const timeAgo = (dateStr) => {
    if (!dateStr) return ''
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    if (diff < 7)  return `${diff} days ago`
    if (diff < 30) return `${Math.floor(diff/7)} weeks ago`
    return `${Math.floor(diff/30)} months ago`
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 mb-5 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-gold-500">Home</Link> /
          <Link to="/search" className="hover:text-gold-500">Properties</Link> /
          <span className="text-primary-900 font-medium truncate">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-black h-80 md:h-96">
              <img src={imageList[imgIndex]} alt={title} className="w-full h-full object-cover" />
              {imageList.length > 1 && <>
                <button onClick={() => setImgIndex(i => (i-1+imageList.length)%imageList.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setImgIndex(i => (i+1)%imageList.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </>}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`badge ${getTypeBadgeColor(type)}`}>{type}</span>
                {verified && <span className="badge bg-green-500 text-white"><BadgeCheck size={11}/> Verified</span>}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={handleSave} className={`w-9 h-9 rounded-full flex items-center justify-center shadow ${saved?'bg-red-500 text-white':'bg-white text-gray-600'}`}>
                  <Heart size={15} fill={saved?'currentColor':'none'}/>
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow text-gray-600"><Share2 size={15}/></button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">{imgIndex+1} / {imageList.length}</div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {imageList.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}
                  className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${imgIndex===i?'border-gold-500':'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>

            {/* Title Block */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-display font-bold text-primary-900 mb-2">{title}</h1>
                  <p className="flex items-center gap-1.5 text-gray-500 text-sm"><MapPin size={14} className="text-gold-500"/>{address}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-display font-bold text-gold-600">{formatPrice(price, listingType)}</p>
                  {listingType==='sell' && area && <p className="text-sm text-gray-400">Rs. {Math.round(price/area).toLocaleString('en-IN')}/sq.ft</p>}
                  <span className={`badge mt-1 ${listingType==='rent'?'bg-blue-100 text-blue-700':'bg-primary-100 text-primary-700'}`}>For {listingType==='rent'?'Rent':'Sale'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-gray-100">
                {[
                  bhk        && { icon: BedDouble, label: bhk,           sub: 'Bedrooms'     },
                  area       && { icon: Maximize2, label: formatArea(area), sub: 'Carpet Area'},
                  floor      && { icon: Layers,    label: floor,          sub: 'Floor'        },
                  age        && { icon: Building,  label: age,            sub: 'Property Age' },
                  furnishing && { icon: Sofa,      label: furnishing,     sub: 'Furnishing'   },
                ].filter(Boolean).slice(0,4).map(({ icon: Icon, label, sub }) => (
                  <div key={sub} className="text-center p-3 bg-gray-50 rounded-xl">
                    <Icon size={20} className="text-primary-700 mx-auto mb-1"/>
                    <p className="font-semibold text-primary-900 text-xs leading-tight">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-display font-bold text-primary-900 mb-3">About this Property</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
            </div>

            {/* Amenities */}
            {amenityNames.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-display font-bold text-primary-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenityNames.map((a, i) => {
                    const name = typeof a === 'string' ? a : a.name
                    return (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                        <span className="text-xl">{AMENITY_ICONS[name]||'✅'}</span>
                        <span className="text-sm text-gray-700">{name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {rera && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck size={22} className="text-green-600 shrink-0"/>
                <div>
                  <p className="font-semibold text-green-800 text-sm">RERA Registered</p>
                  <p className="text-green-700 text-xs font-mono">{rera}</p>
                </div>
              </div>
            )}
            {postedAt && <p className="text-xs text-gray-400 flex items-center gap-1.5"><Calendar size={12}/> Posted {timeAgo(postedAt)}</p>}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-primary-900 mb-4">
                Contact {owner?.is_verified ? 'Verified Agent' : 'Owner'}
              </h3>
              {owner && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 font-bold text-xl border-2 border-gold-200">
                    {owner.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-primary-900 text-sm">{owner.name}</p>
                      {owner.is_verified && <BadgeCheck size={14} className="text-green-500"/>}
                    </div>
                    <p className="text-xs text-gray-500">{owner.agency || owner.role}</p>
                  </div>
                </div>
              )}
              {showContact ? (
                <div className="space-y-3">
                  {owner?.phone && (
                    <a href={`tel:+91${owner.phone}`} className="flex items-center justify-center gap-2 w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                      <Phone size={15}/> +91 {owner.phone}
                    </a>
                  )}
                  {owner?.phone && (
                    <a href={`https://wa.me/91${owner.phone}`} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                      <MessageCircle size={15}/> WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowContact(true)} className="w-full btn-primary flex items-center justify-center gap-2 text-sm">
                  <Phone size={15}/> Show Contact
                </button>
              )}
              <p className="text-xs text-gray-400 text-center mt-4">🔒 Your info is safe with us</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-primary-900 mb-3 text-sm">Quick Facts</h3>
              <div className="space-y-2.5">
                {[
                  ['Type',      type],
                  ['Listing',   listingType==='rent'?'For Rent':'For Sale'],
                  ['City',      city],
                  ['Locality',  locality],
                  furnishing && ['Furnishing', furnishing],
                  floor      && ['Floor',      floor],
                ].filter(Boolean).map(([k,v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-primary-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title mb-1">Similar Properties</h2>
            <p className="section-subtitle mb-6">More properties in {city}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map(p => <PropertyCard key={p.id} property={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}