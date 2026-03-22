import { useParams, Link } from 'react-router-dom'
import { Clock, User, Tag, ArrowLeft, Facebook, Twitter, Link2, ChevronRight } from 'lucide-react'
import { BLOGS } from './Blog'

export default function BlogDetail() {
  const { slug } = useParams()
  const blog = BLOGS.find(b => b.slug === slug)
  const related = BLOGS.filter(b => b.slug !== slug && b.category === blog?.category).slice(0, 2)
  const others  = BLOGS.filter(b => b.slug !== slug).slice(0, 3)

  if (!blog) return (
    <div className="pt-24 text-center py-20">
      <p className="text-5xl mb-4">📰</p>
      <h2 className="text-2xl font-bold text-primary-900 mb-2">Article Not Found</h2>
      <Link to="/blog" className="btn-primary mt-4 inline-block">Back to Blog</Link>
    </div>
  )

  const categoryColor = {
    Investment: 'bg-green-100 text-green-700',
    Guide: 'bg-blue-100 text-blue-700',
    'Market Trends': 'bg-purple-100 text-purple-700',
    Legal: 'bg-red-100 text-red-700',
    Finance: 'bg-amber-100 text-amber-700',
    'City Guide': 'bg-teal-100 text-teal-700',
  }

  // Render content with basic markdown-like formatting
  const renderContent = (text) => {
    return text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return <h3 key={i} className="text-lg font-semibold text-primary-900 mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>
      }
      // Bold inline text
      const parts = para.split(/(\*\*[^*]+\*\*)/)
      return (
        <p key={i} className="text-gray-600 leading-relaxed mb-3">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="text-primary-900 font-semibold">{part.replace(/\*\*/g, '')}</strong>
              : part
          )}
        </p>
      )
    })
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
          <span className={`badge mb-3 ${categoryColor[blog.category] || 'bg-gray-100 text-gray-700'}`}>
            {blog.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">{blog.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
              <Link to="/" className="hover:text-gold-500">Home</Link>
              <ChevronRight size={12} />
              <Link to="/blog" className="hover:text-gold-500">Blog</Link>
              <ChevronRight size={12} />
              <span className="text-primary-900 font-medium truncate">{blog.title}</span>
            </nav>

            <div className="card p-6 sm:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 pb-5 mb-5 border-b border-gray-100 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img src={blog.authorImg} alt={blog.author} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-medium text-primary-900">{blog.author}</span>
                </div>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime} read</span>
                <span>{new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              {/* Excerpt */}
              <p className="text-gray-500 text-base leading-relaxed mb-6 italic border-l-4 border-gold-400 pl-4">
                {blog.excerpt}
              </p>

              {/* Content */}
              <div className="prose max-w-none">
                {renderContent(blog.content)}
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Share this article:</span>
                {[
                  { icon: Facebook, label: 'Facebook', color: 'text-blue-600 hover:bg-blue-50' },
                  { icon: Twitter,  label: 'Twitter',  color: 'text-sky-500 hover:bg-sky-50'  },
                  { icon: Link2,    label: 'Copy Link', color: 'text-gray-600 hover:bg-gray-100'},
                ].map(({ icon: Icon, label, color }) => (
                  <button key={label} title={label}
                    className={`w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center transition-colors ${color}`}>
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="card p-6 mt-6 flex items-start gap-4">
              <img src={blog.authorImg} alt={blog.author} className="w-14 h-14 rounded-full object-cover shrink-0" />
              <div>
                <p className="font-semibold text-primary-900">{blog.author}</p>
                <p className="text-xs text-gray-400 mb-2">Real Estate Expert · GharDekho</p>
                <p className="text-sm text-gray-500">Experienced real estate professional helping buyers and investors make smart property decisions across India.</p>
              </div>
            </div>

            {/* Related */}
            {(related.length > 0 || others.length > 0) && (
              <div className="mt-8">
                <h3 className="text-xl font-display font-bold text-primary-900 mb-5">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(related.length > 0 ? related : others.slice(0, 2)).map(b => (
                    <Link key={b.slug} to={`/blog/${b.slug}`}
                      className="card overflow-hidden group hover:-translate-y-0.5 transition-transform">
                      <img src={b.image} alt={b.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="p-4">
                        <span className={`badge text-xs mb-2 ${categoryColor[b.category] || 'bg-gray-100 text-gray-700'}`}>{b.category}</span>
                        <p className="font-semibold text-primary-900 text-sm leading-snug line-clamp-2 group-hover:text-gold-600 transition-colors">{b.title}</p>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock size={10} /> {b.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Back to Blog */}
            <Link to="/blog" className="flex items-center gap-2 text-sm font-medium text-primary-900 hover:text-gold-500 transition-colors">
              <ArrowLeft size={15} /> Back to All Articles
            </Link>

            {/* Recent Articles */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {others.map(b => (
                  <Link key={b.slug} to={`/blog/${b.slug}`}
                    className="flex gap-3 group">
                    <img src={b.image} alt={b.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-primary-900 leading-snug line-clamp-2 group-hover:text-gold-600 transition-colors">{b.title}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock size={9} /> {b.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="card p-5">
              <h3 className="font-semibold text-primary-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {['Investment', 'Guide', 'Market Trends', 'Legal', 'Finance', 'City Guide'].map(cat => (
                  <Link key={cat} to={`/blog?category=${cat}`}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-gold-500 transition-colors py-1">
                    <span>{cat}</span>
                    <ChevronRight size={13} />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-900 rounded-2xl p-5 text-center">
              <p className="text-white font-semibold mb-2">Looking for a Property?</p>
              <p className="text-gray-300 text-xs mb-4">Browse 1.2L+ verified listings across India</p>
              <Link to="/search" className="btn-primary text-sm block">Search Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
