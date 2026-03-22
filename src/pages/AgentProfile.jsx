import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Phone, MessageCircle, Star, Building2, Calendar, Award } from 'lucide-react'
import PropertyCard from '../components/property/PropertyCard'
import { PROPERTIES } from '../utils/mockData'

const AGENTS = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    agency: 'Prime Realty India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    phone: '9876543210',
    email: 'rajesh@primerealty.in',
    city: 'Mumbai',
    experience: 12,
    rera: 'P51800047290',
    verified: true,
    rating: 4.8,
    reviews: 142,
    totalDeals: 320,
    bio: 'Senior real estate consultant with 12+ years of experience in Mumbai\'s premium residential market. Specializing in Bandra, Juhu, and Andheri localities. Helped 300+ families find their dream homes.',
    specializations: ['Luxury Apartments', 'Sea-facing Properties', 'Investment Properties'],
    languages: ['Hindi', 'English', 'Marathi'],
    areas: ['Bandra', 'Juhu', 'Andheri', 'Powai', 'Worli'],
    awards: ['Top Agent 2023 — Prime Realty', 'Best Customer Service 2022'],
  },
  {
    id: 2,
    name: 'Priya Nair',
    agency: 'Bangalore Homes Pvt. Ltd.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    phone: '9765432109',
    email: 'priya@bangalorehomes.in',
    city: 'Bangalore',
    experience: 8,
    rera: 'PRM/KA/RERA/1251/310',
    verified: true,
    rating: 4.9,
    reviews: 98,
    totalDeals: 185,
    bio: 'Passionate real estate agent specialising in Bangalore\'s IT corridor. Expert in villas and gated communities in Whitefield, Sarjapur and Electronic City. Known for transparent dealings and quick closures.',
    specializations: ['Villas', 'Gated Communities', 'IT Corridor Properties'],
    languages: ['Hindi', 'English', 'Kannada', 'Malayalam'],
    areas: ['Whitefield', 'Sarjapur', 'Electronic City', 'Koramangala', 'HSR Layout'],
    awards: ['Top Agent Q1 2024 — GharDekho', 'Best Villa Specialist 2023'],
  },
]

const REVIEWS = [
  { name: 'Amit Gupta',   city: 'Mumbai',    rating: 5, text: 'Rajesh was extremely professional and helped us find our dream 3 BHK in Bandra. Highly recommend!', date: '2 weeks ago' },
  { name: 'Sneha Patil',  city: 'Mumbai',    rating: 5, text: 'Very knowledgeable about the Mumbai market. Got us a great deal on a sea-facing apartment.', date: '1 month ago' },
  { name: 'Rohit Verma',  city: 'Bangalore', rating: 4, text: 'Quick to respond, honest about property pros and cons. Made the entire process smooth.', date: '3 weeks ago' },
  { name: 'Kavya Reddy',  city: 'Bangalore', rating: 5, text: 'Priya found us an amazing villa in Whitefield within our budget. Super impressed!', date: '2 months ago' },
]

export default function AgentProfile() {
  const { id } = useParams()
  const agent = AGENTS.find(a => a.id === Number(id)) || AGENTS[0]
  const agentListings = PROPERTIES.filter(p => p.agent.name === agent.name)
  const [showPhone, setShowPhone] = useState(false)
  const [activeTab, setActiveTab] = useState('listings')

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-hero h-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Agent Card */}
        <div className="card p-6 -mt-16 mb-6 relative">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end">
            <img src={agent.image} alt={agent.name}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg shrink-0" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-display font-bold text-primary-900">{agent.name}</h1>
                {agent.verified && (
                  <span className="badge bg-green-100 text-green-700 gap-1">
                    <BadgeCheck size={13} /> RERA Verified
                  </span>
                )}
              </div>
              <p className="text-gray-500 flex items-center gap-1.5 mb-2">
                <Building2 size={14} className="text-gold-500" /> {agent.agency}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MapPin size={13} className="text-gold-500" /> {agent.city}</span>
                <span className="flex items-center gap-1"><Calendar size={13} className="text-gold-500" /> {agent.experience} yrs experience</span>
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-gold-400 fill-gold-400" /> {agent.rating} ({agent.reviews} reviews)
                </span>
              </div>
            </div>
            {/* Contact Buttons */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              {showPhone ? (
                <a href={`tel:+91${agent.phone}`}
                  className="flex items-center justify-center gap-2 bg-primary-900 text-white py-2.5 px-4 rounded-xl text-sm font-semibold">
                  <Phone size={14} /> +91 {agent.phone}
                </a>
              ) : (
                <button onClick={() => setShowPhone(true)}
                  className="btn-primary text-sm py-2.5">
                  View Contact
                </button>
              )}
              <a href={`https://wa.me/91${agent.phone}`} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Stats */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-4">Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Deals Closed', value: agent.totalDeals },
                  { label: 'Reviews',      value: agent.reviews    },
                  { label: 'Rating',       value: `${agent.rating}/5` },
                  { label: 'Experience',   value: `${agent.experience} yrs` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-primary-900">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {agent.specializations.map(s => (
                  <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>
                ))}
              </div>
            </div>

            {/* Areas Covered */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-3">Areas Covered</h3>
              <div className="flex flex-wrap gap-2">
                {agent.areas.map(a => (
                  <span key={a} className="badge bg-gold-50 text-gold-700">{a}</span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {agent.languages.map(l => (
                  <span key={l} className="badge bg-gray-100 text-gray-700">{l}</span>
                ))}
              </div>
            </div>

            {/* RERA */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-3">RERA Details</h3>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                <BadgeCheck size={16} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">RERA Number</p>
                  <p className="text-sm font-semibold text-green-700">{agent.rera}</p>
                </div>
              </div>
            </div>

            {/* Awards */}
            {agent.awards?.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-primary-900 mb-3">Awards</h3>
                <div className="space-y-2">
                  {agent.awards.map(a => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <Award size={14} className="text-gold-500 shrink-0" /> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Bio */}
            <div className="card p-6">
              <h3 className="font-semibold text-primary-900 mb-3">About {agent.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{agent.bio}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
              {['listings', 'reviews'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === t ? 'bg-white shadow text-primary-900' : 'text-gray-500 hover:text-gray-700'
                  }`}>{t} {t === 'listings' ? `(${agentListings.length || PROPERTIES.slice(0,2).length})` : `(${REVIEWS.length})`}
                </button>
              ))}
            </div>

            {activeTab === 'listings' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(agentListings.length > 0 ? agentListings : PROPERTIES.slice(0, 2)).map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {/* Rating Summary */}
                <div className="card p-5 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-display font-bold text-primary-900">{agent.rating}</p>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(agent.rating) ? 'text-gold-400 fill-gold-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{agent.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5,4,3,2,1].map(s => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-3">{s}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-400 rounded-full"
                            style={{ width: `${s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 7 : 2}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {REVIEWS.map(({ name, city, rating, text, date }) => (
                  <div key={name} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-900">
                          {name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-primary-900 text-sm">{name}</p>
                          <p className="text-xs text-gray-400">{city} · {date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(rating)].map((_, i) => <Star key={i} size={12} className="text-gold-400 fill-gold-400" />)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">"{text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
