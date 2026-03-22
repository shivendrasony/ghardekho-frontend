import { Shield, TrendingUp, Users, Globe, Heart, Award } from 'lucide-react'
import { STATS } from '../utils/mockData'

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-hero py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About GharDekho</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          India's most trusted real estate platform, helping millions of families find their perfect home since 2018.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-primary-900 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ label, value }) => (
            <div key={label}>
              <p className="text-3xl font-display font-bold text-gold-400">{value}</p>
              <p className="text-gray-300 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="section-title mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At GharDekho, we believe that finding a home should be simple, transparent, and trustworthy.
          We connect buyers, sellers, and agents across India with verified listings, real data,
          and a platform built on honesty — so every Indian family can find their perfect home with confidence.
        </p>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield,    title: 'Trust & Transparency', desc: 'Every listing is verified. No fake properties. No hidden charges. What you see is what you get.' },
              { icon: Heart,     title: 'Customer First',       desc: 'From your first search to your final deal, our team is with you every step of the way.' },
              { icon: Globe,     title: 'Pan-India Reach',      desc: 'Whether you\'re in a metro city or a small town, GharDekho covers 500+ cities across India.' },
              { icon: TrendingUp,title: 'Data-Driven Insights', desc: 'Our pricing tools and market reports give you the knowledge to negotiate from a position of strength.' },
              { icon: Users,     title: 'Agent Community',      desc: '12,000+ verified RERA agents trust GharDekho to grow their business and manage their listings.' },
              { icon: Award,     title: 'Award-Winning Platform',desc: 'Recognized as India\'s Best Real Estate Platform by PropTech India Awards 2023.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary-700" />
                </div>
                <h3 className="font-semibold text-primary-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title mb-2">Our Leadership Team</h2>
          <p className="section-subtitle mb-10">Passionate people building the future of Indian real estate</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Vikram Mehta',  role: 'CEO & Co-Founder',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
              { name: 'Priya Nair',    role: 'CTO & Co-Founder',       img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
              { name: 'Rajesh Sharma', role: 'Head of Operations',     img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
              { name: 'Sneha Joshi',   role: 'Head of Product Design', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
            ].map(({ name, role, img }) => (
              <div key={name} className="card p-5 text-center hover:-translate-y-1 transition-transform">
                <img src={img} alt={name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400" />
                <p className="font-semibold text-primary-900 text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
