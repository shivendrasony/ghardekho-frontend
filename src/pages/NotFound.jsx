import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-8xl font-display font-bold text-primary-900 mb-2">404</p>
        <p className="text-6xl mb-6">🏚️</p>
        <h2 className="text-2xl font-display font-bold text-primary-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Looks like this page has moved or doesn't exist. Let's get you back home!
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary">Go to Home</Link>
          <Link to="/search" className="btn-outline">Browse Properties</Link>
        </div>
      </div>
    </div>
  )
}
