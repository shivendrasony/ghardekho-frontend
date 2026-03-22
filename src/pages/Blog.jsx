import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, User, Tag, ArrowRight, Search } from 'lucide-react'

export const BLOGS = [
  {
    slug: 'best-areas-to-invest-patna-2024',
    title: 'Best Areas to Invest in Patna Real Estate in 2024',
    excerpt: 'Patna is rapidly transforming into a real estate hotspot. Here are the top localities to invest in — from Boring Road to Bailey Road — with price trends and growth potential.',
    category: 'Investment',
    author: 'Vikram Mehta',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    date: '2024-03-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    featured: true,
    content: `Patna, the capital of Bihar, has been witnessing rapid urban development over the past few years. With major infrastructure projects like the Patna Metro, new ring roads, and the AIIMS hospital, real estate demand has shot up significantly.\n\n**Top Areas to Watch:**\n\n1. **Boring Road** — Premium locality with excellent schools, hospitals and malls nearby. Flat prices range from ₹45–80 lakh for 2 BHK.\n\n2. **Bailey Road** — Wide road connectivity, good social infrastructure. Excellent for mid-segment buyers.\n\n3. **Danapur** — Affordable plots available. Good connectivity to the city. Ideal for long-term investment.\n\n4. **Rajendra Nagar** — Established locality, steady appreciation. Safe for residential investment.\n\n5. **Phulwarisharif** — Upcoming area with affordable prices. Near the new bypass highway.`,
  },
  {
    slug: 'first-home-buyer-guide-india',
    title: 'Complete Guide for First-Time Home Buyers in India',
    excerpt: 'Buying your first home can be overwhelming. This step-by-step guide covers everything — from home loan eligibility to registration charges — so you can buy with complete confidence.',
    category: 'Guide',
    author: 'Priya Nair',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    date: '2024-03-10',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    featured: true,
    content: `Buying your first home is one of the biggest financial decisions of your life. Here's everything you need to know...\n\n**Step 1: Determine Your Budget**\nStart with your take-home salary and apply the 40% EMI rule — your total EMIs should not exceed 40% of your monthly income.\n\n**Step 2: Check Home Loan Eligibility**\nVisit 2-3 banks and check pre-approved loan amounts. Compare interest rates — even 0.25% difference saves lakhs over 20 years.\n\n**Step 3: Shortlist Properties**\nUse GharDekho to filter by budget, location, and BHK. Visit at least 5-6 properties before deciding.\n\n**Step 4: Legal Due Diligence**\nCheck RERA registration, title documents, NOC from bank if resale, and approved building plan.\n\n**Step 5: Negotiate**\nAlways negotiate. Most sellers quote 5-15% above their floor price.`,
  },
  {
    slug: 'mumbai-property-market-2024',
    title: 'Mumbai Property Market: Trends and Forecasts for 2024',
    excerpt: "Mumbai's real estate market continued its bull run in 2023. We analyze price movements across key micro-markets — Bandra, Powai, Thane — and what to expect in 2024.",
    category: 'Market Trends',
    author: 'Rajesh Sharma',
    authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    date: '2024-03-05',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
    featured: false,
    content: `Mumbai's property market saw a 14% price increase in 2023, driven by strong demand from IT professionals and HNIs.\n\n**Key Micro-Markets:**\n\n**Bandra West:** Premium segment. Prices ₹35,000–55,000 per sq.ft. High demand from entertainment and finance professionals.\n\n**Powai:** Mid-premium. ₹18,000–28,000 per sq.ft. Strong IT hub, excellent rental yields.\n\n**Thane:** Affordable. ₹9,000–16,000 per sq.ft. Best value for families. Metro connectivity improving rapidly.`,
  },
  {
    slug: 'rera-what-home-buyers-need-to-know',
    title: 'RERA Explained: What Every Home Buyer Must Know',
    excerpt: 'The Real Estate Regulation and Development Act (RERA) is your shield as a buyer. Learn how to verify RERA registration, what protections you get, and what to do if a builder defaults.',
    category: 'Legal',
    author: 'Sneha Joshi',
    authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80',
    date: '2024-02-28',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    featured: false,
    content: `RERA, enacted in 2016, is one of the most important reforms in Indian real estate. Here's everything you need to know as a buyer.\n\n**What Does RERA Do?**\n- Mandates registration of all projects above 500 sq.mt or 8 apartments\n- Protects buyers from project delays and fund diversion\n- Establishes Real Estate Regulatory Authorities in each state\n\n**How to Verify RERA Registration:**\n1. Visit your state's RERA website (e.g., maharera.mahaonline.gov.in for Maharashtra)\n2. Enter the RERA number provided by the builder\n3. Verify project details, approved plans, and completion timeline`,
  },
  {
    slug: 'home-loan-tips-india-2024',
    title: '10 Tips to Get the Best Home Loan Rate in India',
    excerpt: 'Getting a good interest rate on your home loan can save you lakhs over the loan tenure. Here are 10 proven tips to secure the best deal from banks and NBFCs.',
    category: 'Finance',
    author: 'Vikram Mehta',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    date: '2024-02-20',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    featured: false,
    content: `A 0.5% difference in home loan interest rate on a ₹50 lakh loan over 20 years saves you over ₹6 lakhs. Here are tips to get the best rate.\n\n1. **Maintain CIBIL score above 750** — Banks offer lowest rates to high credit score borrowers.\n2. **Apply with multiple banks simultaneously** — Compare offers and use them to negotiate.\n3. **Opt for floating rate** — Usually lower than fixed rate in current market conditions.\n4. **Make a higher down payment** — Reduces loan amount and shows lower risk to bank.\n5. **Transfer your loan** — If another bank offers lower rate after 2 years, do a balance transfer.`,
  },
  {
    slug: 'bangalore-it-corridor-real-estate',
    title: "Bangalore's IT Corridor: Best Localities for Tech Professionals",
    excerpt: "If you work in Bangalore's IT sector, choosing the right locality can save you 2 hours of commute every day. We compare Whitefield, Electronic City, Sarjapur, and Hebbal.",
    category: 'City Guide',
    author: 'Priya Nair',
    authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    date: '2024-02-15',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80',
    featured: false,
    content: `Bangalore's IT sector employs over 15 lakh professionals. Choosing the right locality near your office is crucial for work-life balance.\n\n**Whitefield** — Best for: Infosys, Wipro, ITPL employees. Avg rent: ₹20,000–35,000/mo for 2 BHK. Good social infra, metro coming soon.\n\n**Electronic City** — Best for: Siemens, TCS, HP employees. Avg rent: ₹14,000–22,000/mo. More affordable, flyover reduces commute time.`,
  },
]

const CATEGORIES = ['All', 'Investment', 'Guide', 'Market Trends', 'Legal', 'Finance', 'City Guide']

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [search, setSearch]     = useState('')

  const filtered = BLOGS.filter(b => {
    const matchCat  = category === 'All' || b.category === category
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = BLOGS.filter(b => b.featured)
  const regular  = filtered.filter(b => !b.featured || category !== 'All' || search)

  const categoryColor = {
    Investment: 'bg-green-100 text-green-700',
    Guide: 'bg-blue-100 text-blue-700',
    'Market Trends': 'bg-purple-100 text-purple-700',
    Legal: 'bg-red-100 text-red-700',
    Finance: 'bg-amber-100 text-amber-700',
    'City Guide': 'bg-teal-100 text-teal-700',
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-hero py-16 px-4 text-center">
        <h1 className="text-4xl font-display font-bold text-white mb-3">Real Estate Insights</h1>
        <p className="text-gray-300 text-lg mb-8">Expert guides, market trends, and investment tips for Indian home buyers</p>
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                category === c ? 'bg-primary-900 border-primary-900 text-white' : 'border-gray-200 text-gray-600 hover:border-primary-300'
              }`}>{c}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {category === 'All' && !search && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featured.map(blog => (
              <Link key={blog.slug} to={`/blog/${blog.slug}`}
                className="card overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="relative h-52 overflow-hidden">
                  <img src={blog.image} alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 left-3 badge ${categoryColor[blog.category] || 'bg-gray-100 text-gray-700'}`}>
                    {blog.category}
                  </span>
                  <span className="absolute top-3 right-3 badge bg-gold-400 text-white">Featured</span>
                </div>
                <div className="p-5">
                  <h2 className="font-display font-bold text-primary-900 text-lg leading-snug mb-2 group-hover:text-gold-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={blog.authorImg} alt={blog.author} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(category === 'All' && !search ? BLOGS : filtered).map(blog => (
            <Link key={blog.slug} to={`/blog/${blog.slug}`}
              className="card overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="relative h-44 overflow-hidden">
                <img src={blog.image} alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-3 left-3 badge ${categoryColor[blog.category] || 'bg-gray-100 text-gray-700'}`}>
                  {blog.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary-900 text-sm leading-snug mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-2 mb-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <img src={blog.authorImg} alt={blog.author} className="w-5 h-5 rounded-full object-cover" />
                    {blog.author}
                  </div>
                  <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📰</p>
            <p className="text-gray-500">No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
