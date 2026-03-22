// Format price in Indian format: ₹ 45 Lakh, ₹ 1.2 Cr
export function formatPrice(price, listingType = 'sell') {
  if (listingType === 'rent') return `₹ ${price.toLocaleString('en-IN')}/mo`
  if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(1)} Cr`
  if (price >= 100000)   return `₹ ${(price / 100000).toFixed(1)} Lakh`
  return `₹ ${price.toLocaleString('en-IN')}`
}

// Format area
export function formatArea(area) {
  return `${area.toLocaleString('en-IN')} sq.ft`
}

// Relative date
export function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`
  return `${Math.floor(diff / 30)} months ago`
}

// Get type badge color
export function getTypeBadgeColor(type) {
  const map = {
    Flat: 'bg-blue-100 text-blue-700',
    House: 'bg-green-100 text-green-700',
    Villa: 'bg-purple-100 text-purple-700',
    Plot: 'bg-amber-100 text-amber-700',
    Commercial: 'bg-gray-100 text-gray-700',
  }
  return map[type] || 'bg-gray-100 text-gray-700'
}
