import { Link, useNavigate } from 'react-router-dom'
import { Shield, TrendingUp, Users, Star, ArrowRight, Phone, CheckCircle2 } from 'lucide-react'
import SearchBar from '../components/search/SearchBar'
import PropertyCard from '../components/property/PropertyCard'
import { PROPERTIES, TOP_CITIES, TESTIMONIALS, STATS } from '../utils/mockData'

export default function Home() {
  const navigate = useNavigate()
  const featured  = PROPERTIES.filter(p => p.featured)
  const recent    = PROPERTIES.slice(0, 6)

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-hero min-h-screen flex items-center relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-gold-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              🏠 India's Most Trusted Real Estate Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Find Your Perfect<br />
              <span className="text-gold-400">Dream Home</span> in India
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
              Search from over <strong className="text-white">1.2 lakh verified</strong> properties across 500+ cities.
              Buy, Sell or Rent with complete confidence.
            </p>
          </div>

          <div className="animate-fade-in-up delay-200">
            <SearchBar />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in-up delay-300">
            <span className="text-gray-400 text-sm">Popular:</span>
            {['Flat in Mumbai', 'Villa in Bangalore', '2 BHK in Pune', 'Plot in Hyderabad'].map(s => (
              <button key={s}
                onClick={() => navigate(`/search?q=${s}`)}
                className="text-xs text-gray-300 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-display font-bold text-gold-400">{value}</p>
                <p className="text-gray-300 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPERTY TYPES ────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Browse by Property Type</h2>
            <p className="section-subtitle">Find the property that suits you best</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { type: 'Flat',       emoji: '🏢', count: '48,200+' },
              { type: 'House',      emoji: '🏡', count: '22,400+' },
              { type: 'Villa',      emoji: '🏰', count: '8,100+'  },
              { type: 'Plot',       emoji: '📐', count: '15,600+' },
              { type: 'Commercial', emoji: '🏬', count: '9,800+'  },
            ].map(({ type, emoji, count }) => (
              <Link key={type}
                to={`/search?propType=${type}`}
                className="card p-6 text-center hover:-translate-y-1 transition-transform group cursor-pointer">
                <div className="text-4xl mb-3">{emoji}</div>
                <p className="font-semibold text-primary-900 group-hover:text-gold-500 transition-colors">{type}</p>
                <p className="text-xs text-gray-400 mt-1">{count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-subtitle">Hand-picked premium listings</p>
            </div>
            <Link to="/search" className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ── TOP CITIES ────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Explore Top Cities</h2>
            <p className="section-subtitle">Properties in India's most sought-after locations</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOP_CITIES.map(({ name, state, listings, image }) => (
              <Link key={name}
                to={`/search?city=${name}`}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                <img src={image} alt={name} className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-gray-300 text-xs">{listings.toLocaleString('en-IN')}+ listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT LISTINGS ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Recent Listings</h2>
              <p className="section-subtitle">Fresh properties added this week</p>
            </div>
            <Link to="/search" className="flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ── WHY GHARDEKHO ─────────────────────────────────────────────── */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Why Choose GharDekho?</h2>
            <p className="text-gray-300 mt-2">Trusted by millions of Indians to find their dream home</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield,    title: 'Verified Listings',     desc: 'Every listing goes through our strict 3-step verification process so you see only genuine properties.' },
              { icon: TrendingUp,title: 'Best Price Guarantee',  desc: 'Our data-driven price insights ensure you always negotiate from a position of strength.' },
              { icon: Users,     title: '12,000+ Expert Agents', desc: 'Connect with RERA-verified agents who know your city best and will guide you through every step.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={26} className="text-gold-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Real stories from happy homeowners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, city, text, rating, avatar }) => (
              <div key={name} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={14} className="text-gold-400 fill-gold-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-primary-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POST PROPERTY CTA ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">Post your property for FREE and connect with lakhs of buyers and tenants</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-gray-300">
              {['Free Listing', 'Verified Buyers', 'Instant Leads', 'Dedicated Support'].map(f => (
                <span key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-gold-400" /> {f}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/post-property" className="btn-primary">Post Property Free</Link>
              <a href="tel:+919876543210" className="flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors">
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
