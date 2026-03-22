import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, BedDouble, Maximize2, BadgeCheck, Phone, MessageCircle, Heart, Share2, ChevronLeft, ChevronRight, ShieldCheck, Layers, Sofa, Building, Calendar } from 'lucide-react'
import { PROPERTIES } from '../utils/mockData'
import PropertyCard from '../components/property/PropertyCard'
import { formatPrice, formatArea, timeAgo, getTypeBadgeColor } from '../utils/helpers'

const AMENITY_ICONS = { 'Parking':'🚗','Gym':'💪','Swimming Pool':'🏊','Lift':'🛗','Security':'🔒','Power Backup':'⚡','Club House':'🏛️','Garden':'🌿','Kids Play Area':'🛝','CCTV':'📷','Home Theatre':'🎬','Wine Cellar':'🍷','Solar Power':'☀️','EV Charging':'🔌','Corner Plot':'📐','Wide Road':'🛣️','24/7 Security':'🔐','Gated Colony':'🚧','Rain Water Harvesting':'💧' }

export default function PropertyDetail() {
  const { id } = useParams()
  const property = PROPERTIES.find(p => p.id === Number(id))
  const [imgIndex, setImgIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showContact, setShowContact] = useState(false)

  if (!property) return (
    <div className="pt-24 text-center py-20">
      <div className="text-6xl mb-4">🏚️</div>
      <h2 className="text-2xl font-semibold text-primary-900 mb-4">Property not found</h2>
      <Link to="/search" className="btn-primary inline-block">Browse Properties</Link>
    </div>
  )

  const { title, type, listingType, price, area, bhk, floor, age, furnishing, city, locality, address, description, amenities, images, agent, verified, postedAt, rera } = property
  const similar = PROPERTIES.filter(p => p.id !== property.id && p.city === city).slice(0, 3)

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
              <img src={images[imgIndex]} alt={title} className="w-full h-full object-cover" />
              {images.length > 1 && <>
                <button onClick={() => setImgIndex(i => (i-1+images.length)%images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setImgIndex(i => (i+1)%images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </>}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`badge ${getTypeBadgeColor(type)}`}>{type}</span>
                {verified && <span className="badge bg-green-500 text-white"><BadgeCheck size={11}/> Verified</span>}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => setSaved(v=>!v)} className={`w-9 h-9 rounded-full flex items-center justify-center shadow ${saved?'bg-red-500 text-white':'bg-white text-gray-600'}`}>
                  <Heart size={15} fill={saved?'currentColor':'none'}/>
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow text-gray-600"><Share2 size={15}/></button>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">{imgIndex+1} / {images.length}</div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((img, i) => (
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
                  {listingType==='sell' && <p className="text-sm text-gray-400">Rs. {Math.round(price/area).toLocaleString('en-IN')}/sq.ft</p>}
                  <span className={`badge mt-1 ${listingType==='rent'?'bg-blue-100 text-blue-700':'bg-primary-100 text-primary-700'}`}>For {listingType==='rent'?'Rent':'Sale'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-gray-100">
                {[
                  bhk && { icon: BedDouble, label: bhk, sub: 'Bedrooms' },
                  { icon: Maximize2, label: formatArea(area), sub: 'Carpet Area' },
                  floor && { icon: Layers, label: floor, sub: 'Floor' },
                  age && { icon: Building, label: age, sub: 'Property Age' },
                  furnishing && { icon: Sofa, label: furnishing, sub: 'Furnishing' },
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
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-display font-bold text-primary-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                      <span className="text-xl">{AMENITY_ICONS[a]||'✅'}</span>
                      <span className="text-sm text-gray-700">{a}</span>
                    </div>
                  ))}
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
            <p className="text-xs text-gray-400 flex items-center gap-1.5"><Calendar size={12}/> Posted {timeAgo(postedAt)}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-primary-900 mb-4">Contact {agent.verified?'Verified Agent':'Owner'}</h3>
              <div className="flex items-center gap-3 mb-5">
                <img src={agent.image} alt={agent.name} className="w-14 h-14 rounded-full object-cover border-2 border-gold-200"/>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-primary-900 text-sm">{agent.name}</p>
                    {agent.verified && <BadgeCheck size={14} className="text-green-500"/>}
                  </div>
                  <p className="text-xs text-gray-500">{agent.agency}</p>
                </div>
              </div>
              {showContact ? (
                <div className="space-y-3">
                  <a href={`tel:+91${agent.phone}`} className="flex items-center justify-center gap-2 w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                    <Phone size={15}/> +91 {agent.phone}
                  </a>
                  <a href={`https://wa.me/91${agent.phone}`} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                    <MessageCircle size={15}/> WhatsApp
                  </a>
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
                {[['Type', type],['Listing', listingType==='rent'?'For Rent':'For Sale'],['City', city],['Locality', locality],furnishing&&['Furnishing',furnishing],floor&&['Floor',floor]].filter(Boolean).map(([k,v])=>(
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-primary-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
