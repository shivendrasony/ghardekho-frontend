import { useState } from 'react'
import { CheckCircle, Upload, ChevronRight, ChevronLeft, Home } from 'lucide-react'
import { CITIES } from '../utils/mockData'

const STEPS = ['Basic Info', 'Details', 'Pricing', 'Amenities', 'Photos', 'Review']
const AMENITIES_LIST = ['Parking', 'Lift', 'Gym', 'Swimming Pool', 'Security', 'Power Backup',
  'Club House', 'Garden', 'Kids Play Area', 'Rain Water Harvesting', 'CCTV', 'Intercom',
  'Gas Pipeline', 'Solar Power', 'EV Charging', 'Servant Room']

const empty = {
  propType: '', listingType: 'sell', city: '', locality: '', address: '',
  bhk: '', area: '', floor: '', totalFloors: '', age: '', furnishing: '',
  facing: '', price: '', negotiable: false, maintenance: '',
  amenities: [], description: '', images: [], rera: '', ownerType: 'owner',
}

export default function PostProperty() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(empty)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const toggleAmenity = a => set('amenities', form.amenities.includes(a)
    ? form.amenities.filter(x => x !== a) : [...form.amenities, a])

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const handleImageDrop = e => {
    e.preventDefault(); setDragOver(false)
    const files = Array.from(e.dataTransfer?.files || e.target.files || [])
      .filter(f => f.type.startsWith('image/')).slice(0, 15)
    const previews = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }))
    set('images', [...form.images, ...previews].slice(0, 15))
  }

  if (submitted) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="card p-12 text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-primary-900 mb-3">Property Listed!</h2>
        <p className="text-gray-500 mb-6">Your property has been submitted for review. We'll verify and publish it within 24 hours.</p>
        <button onClick={() => { setForm(empty); setStep(0); setSubmitted(false) }}
          className="btn-primary">Post Another Property</button>
      </div>
    </div>
  )

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="section-title">Post Your Property</h1>
          <p className="section-subtitle">Fill in the details to list your property for FREE</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto scrollbar-hide pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  i < step  ? 'bg-green-500 border-green-500 text-white' :
                  i === step ? 'bg-primary-900 border-primary-900 text-white' :
                  'bg-white border-gray-200 text-gray-400'
                }`}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${i === step ? 'text-primary-900 font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-10 sm:w-16 mx-1 mt-0 mb-4 transition-all ${i < step ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-6 sm:p-8">
          {/* STEP 0: Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {['sell', 'rent'].map(t => (
                  <button key={t} onClick={() => set('listingType', t)}
                    className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                      form.listingType === t ? 'bg-primary-900 border-primary-900 text-white' : 'border-gray-200 text-gray-600 hover:border-primary-300'
                    }`}>
                    {t === 'sell' ? '🏷️ Sell' : '🔑 Rent'}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Property Type *</label>
                <div className="flex flex-wrap gap-2">
                  {['Flat', 'House', 'Villa', 'Plot', 'Commercial'].map(t => (
                    <button key={t} onClick={() => set('propType', t)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        form.propType === t ? 'bg-gold-500 border-gold-500 text-white' : 'border-gray-200 text-gray-600 hover:border-gold-300'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">City *</label>
                  <select value={form.city} onChange={e => set('city', e.target.value)} className="input-field">
                    <option value="">Select City</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Locality *</label>
                  <input value={form.locality} onChange={e => set('locality', e.target.value)}
                    placeholder="e.g. Bandra West" className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Address *</label>
                <textarea value={form.address} onChange={e => set('address', e.target.value)}
                  placeholder="Society name, street, area..." rows={2} className="input-field resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">You are a</label>
                <div className="flex gap-3">
                  {['owner', 'agent'].map(r => (
                    <button key={r} onClick={() => set('ownerType', r)}
                      className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold capitalize transition-all ${
                        form.ownerType === r ? 'bg-primary-900 border-primary-900 text-white' : 'border-gray-200 text-gray-600 hover:border-primary-300'
                      }`}>{r === 'owner' ? '👤 Owner' : '🏢 Agent'}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Property Details */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Property Details</h2>
              {form.propType !== 'Plot' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">BHK</label>
                  <div className="flex flex-wrap gap-2">
                    {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(b => (
                      <button key={b} onClick={() => set('bhk', b)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          form.bhk === b ? 'bg-primary-900 border-primary-900 text-white' : 'border-gray-200 text-gray-600 hover:border-primary-300'
                        }`}>{b}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Area (sq.ft) *</label>
                  <input type="number" value={form.area} onChange={e => set('area', e.target.value)}
                    placeholder="e.g. 1200" className="input-field" />
                </div>
                {form.propType !== 'Plot' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Floor</label>
                    <input value={form.floor} onChange={e => set('floor', e.target.value)}
                      placeholder="e.g. 5th of 14" className="input-field" />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Age of Property</label>
                  <select value={form.age} onChange={e => set('age', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {['Under Construction', 'New (0-1 yr)', '1-5 years', '5-10 years', '10+ years'].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Facing</label>
                  <select value={form.facing} onChange={e => set('facing', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              {form.propType !== 'Plot' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Furnishing Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Unfurnished', 'Semi Furnished', 'Fully Furnished'].map(f => (
                      <button key={f} onClick={() => set('furnishing', f)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          form.furnishing === f ? 'bg-primary-900 border-primary-900 text-white' : 'border-gray-200 text-gray-600 hover:border-primary-300'
                        }`}>{f}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="Describe your property — key features, nearby landmarks, society details..." rows={4}
                  className="input-field resize-none" />
              </div>
            </div>
          )}

          {/* STEP 2: Pricing */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Pricing Details</h2>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  {form.listingType === 'rent' ? 'Monthly Rent (₹) *' : 'Expected Price (₹) *'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                    placeholder={form.listingType === 'rent' ? '25000' : '5000000'}
                    className="input-field pl-8" />
                </div>
                {form.price && (
                  <p className="text-xs text-gray-400 mt-1">
                    = ₹ {Number(form.price) >= 10000000
                      ? `${(Number(form.price) / 10000000).toFixed(2)} Crore`
                      : Number(form.price) >= 100000
                      ? `${(Number(form.price) / 100000).toFixed(2)} Lakh`
                      : Number(form.price).toLocaleString('en-IN')}
                  </p>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.negotiable} onChange={e => set('negotiable', e.target.checked)}
                  className="w-4 h-4 accent-primary-900" />
                <span className="text-sm text-gray-700 font-medium">Price is Negotiable</span>
              </label>
              {form.listingType === 'rent' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Monthly Maintenance (₹)</label>
                  <input type="number" value={form.maintenance} onChange={e => set('maintenance', e.target.value)}
                    placeholder="e.g. 3000" className="input-field" />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">RERA Number (if applicable)</label>
                <input value={form.rera} onChange={e => set('rera', e.target.value)}
                  placeholder="e.g. P51800047290" className="input-field" />
                <p className="text-xs text-gray-400 mt-1">Properties with RERA number get verified badge and more trust from buyers.</p>
              </div>
            </div>
          )}

          {/* STEP 3: Amenities */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_LIST.map(a => (
                  <label key={a}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.amenities.includes(a) ? 'border-primary-900 bg-primary-50' : 'border-gray-200 hover:border-primary-300'
                    }`}>
                    <input type="checkbox" checked={form.amenities.includes(a)}
                      onChange={() => toggleAmenity(a)} className="w-4 h-4 accent-primary-900" />
                    <span className="text-sm font-medium text-gray-700">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Photos */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Photos & Media</h2>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleImageDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
                  dragOver ? 'border-gold-400 bg-gold-50' : 'border-gray-300 hover:border-primary-400'
                }`}>
                <Upload size={36} className="text-gray-400 mx-auto mb-3" />
                <p className="font-semibold text-gray-700">Drag & drop photos here</p>
                <p className="text-sm text-gray-400 mb-4">or click to browse (min 3, max 15 photos)</p>
                <label className="btn-outline cursor-pointer">
                  Browse Photos
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageDrop} />
                </label>
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img src={img.url} alt="" className="w-full h-full object-cover rounded-xl" />
                      <button
                        onClick={() => set('images', form.images.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        ×
                      </button>
                      {i === 0 && <span className="absolute bottom-1 left-1 bg-primary-900 text-white text-xs px-1.5 py-0.5 rounded">Cover</span>}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400">Tip: Add bright, clear photos from multiple angles to get 5x more inquiries!</p>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">Review & Submit</h2>
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
                {[
                  ['Property Type', form.propType],
                  ['Listing Type',  form.listingType === 'sell' ? 'For Sale' : 'For Rent'],
                  ['City',          form.city],
                  ['Locality',      form.locality],
                  ['BHK',           form.bhk || '—'],
                  ['Area',          form.area ? `${form.area} sq.ft` : '—'],
                  ['Price',         form.price ? `₹ ${Number(form.price).toLocaleString('en-IN')}` : '—'],
                  ['Furnishing',    form.furnishing || '—'],
                  ['Amenities',     form.amenities.join(', ') || '—'],
                  ['Photos',        `${form.images.length} uploaded`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-primary-900 text-right max-w-xs truncate">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1 w-4 h-4 accent-primary-900" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I confirm that the details provided are accurate and I agree to GharDekho's
                  <a href="#" className="text-gold-500 hover:underline"> Terms of Service</a> and
                  <a href="#" className="text-gold-500 hover:underline"> Privacy Policy</a>.
                </label>
              </div>
              <button onClick={() => setSubmitted(true)} className="btn-primary w-full text-base py-4">
                🚀 Submit Property Listing
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={prev} disabled={step === 0}
              className="flex items-center gap-2 btn-outline disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={16} /> Previous
            </button>
            {step < STEPS.length - 1 && (
              <button onClick={next} className="flex items-center gap-2 btn-secondary">
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
