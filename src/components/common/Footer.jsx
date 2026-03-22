import { Link } from 'react-router-dom'
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                <Home size={18} className="text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-gold-400">Ghar<span className="text-white">Dekho</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              India's most trusted real estate platform. Find your dream home from over 1.2 lakh verified listings across 500+ cities.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 flex items-center justify-center transition-colors">
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Buy Property',   to: '/search?type=sell' },
                { label: 'Rent Property',  to: '/search?type=rent' },
                { label: 'Sell Property',  to: '/post-property' },
                { label: 'Plots & Land',   to: '/search?propType=Plot' },
                { label: 'Commercial',     to: '/search?propType=Commercial' },
                { label: 'About Us',       to: '/about' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-base">Top Cities</h4>
            <ul className="space-y-3">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Patna'].map(city => (
                <li key={city}>
                  <Link to={`/search?city=${city}`} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                    Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                GharDekho Pvt. Ltd., 4th Floor, Tower B, DLF Cyber City, Gurugram — 122002
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-gold-400 shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-gold-400 shrink-0" />
                support@ghardekho.in
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3">Download App</p>
              <div className="flex gap-2">
                <div className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2 text-xs text-white cursor-pointer">
                  📱 Google Play
                </div>
                <div className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2 text-xs text-white cursor-pointer">
                  🍎 App Store
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 GharDekho Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
