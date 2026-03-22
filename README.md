# 🏠 GharDekho — Real Estate Frontend

A complete, production-ready React JS frontend for an Indian real estate platform.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

That's it! The frontend runs fully with mock data — no backend needed yet.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Navbar, Footer, ProtectedRoute, ScrollToTop
│   ├── property/      # PropertyCard
│   └── search/        # SearchBar
├── context/           # AuthContext (login/logout state)
├── pages/
│   ├── Home.jsx           ← Landing page
│   ├── SearchResults.jsx  ← Search + filter page
│   ├── PropertyDetail.jsx ← Single property view
│   ├── PostProperty.jsx   ← Multi-step listing form
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── BuyerDashboard.jsx
│   ├── AgentDashboard.jsx
│   ├── About.jsx
│   └── NotFound.jsx
├── utils/
│   ├── mockData.js    ← All dummy data (replace with API later)
│   └── helpers.js     ← Price formatting, date utils
└── index.css          ← Tailwind + custom styles
```

---

## 🛣️ Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/search` | Search Results (with filters) |
| `/property/:id` | Property Detail |
| `/post-property` | Post Property (protected) |
| `/login` | Login |
| `/register` | Register |
| `/dashboard/buyer` | Buyer Dashboard (protected) |
| `/dashboard/agent` | Agent Dashboard (protected) |
| `/about` | About Us |
| `*` | 404 Not Found |

---

## 🔗 Connecting to Django Backend

When your Django backend is ready, replace mock data calls in:

1. **`src/utils/mockData.js`** — Replace with `axios` API calls
2. **`src/pages/Login.jsx`** — Replace mock login with:
   ```js
   const res = await axios.post('/api/auth/login/', { email, password })
   login(res.data)
   ```
3. **`src/pages/Register.jsx`** — POST to `/api/auth/register/`
4. **`src/pages/SearchResults.jsx`** — GET `/api/properties/?city=Mumbai&type=sell`
5. **`src/pages/PropertyDetail.jsx`** — GET `/api/properties/:id/`
6. **`src/pages/PostProperty.jsx`** — POST `/api/properties/`

Create a base Axios instance in `src/services/api.js`:
```js
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000/api' })

api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('ghardekho_user') || '{}')
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`
  return config
})

export default api
```

---

## 🏗️ Built With

- **React 18** + Vite
- **Tailwind CSS**
- **React Router DOM v6**
- **Lucide React** (icons)

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` folder — ready to deploy on Netlify, Vercel, or your server.
