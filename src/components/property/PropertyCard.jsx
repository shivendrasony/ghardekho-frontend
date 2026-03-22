import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Maximize2, BedDouble, BadgeCheck, Calendar } from 'lucide-react'
import { formatPrice, formatArea, getTypeBadgeColor, timeAgo } from '../../utils/helpers'

export default function PropertyCard({ property }) {
  const [saved, setSaved] = useState(false)
  const [imgError, setImgError] = useState(false)

  const {
    id, title, type, listingType, price, area, bhk,
    city, locality, images, verified, featured, postedAt,
  } = property

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' : images[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${getTypeBadgeColor(type)}`}>{type}</span>
          {featured && <span className="badge bg-gold-400 text-white">Featured</span>}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {verified && (
            <span className="badge bg-green-500 text-white gap-1">
              <BadgeCheck size={11} /> Verified
            </span>
          )}
          <button
            onClick={() => setSaved(v => !v)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              saved ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-red-50'
            }`}
            title="Save property">
            <Heart size={14} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Listing type pill */}
        <div className="absolute bottom-3 left-3">
          <span className={`badge font-semibold ${listingType === 'rent' ? 'bg-blue-600 text-white' : 'bg-primary-900 text-white'}`}>
            For {listingType === 'rent' ? 'Rent' : 'Sale'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-primary-900 text-sm leading-snug line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin size={11} className="text-gold-500" />
          {locality}, {city}
        </p>

        {/* Details row */}
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
          {bhk && (
            <span className="flex items-center gap-1">
              <BedDouble size={13} className="text-primary-700" /> {bhk}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize2 size={12} className="text-primary-700" /> {formatArea(area)}
          </span>
          <span className="flex items-center gap-1 text-gray-400 ml-auto">
            <Calendar size={11} /> {timeAgo(postedAt)}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gold-600 font-bold text-lg font-display">{formatPrice(price, listingType)}</span>
            {listingType === 'sell' && area && (
              <p className="text-xs text-gray-400">₹ {Math.round(price / area).toLocaleString('en-IN')}/sq.ft</p>
            )}
          </div>
          <Link
            to={`/property/${id}`}
            className="bg-primary-900 hover:bg-primary-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
