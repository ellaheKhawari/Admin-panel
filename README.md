# Nova — Admin Panel

A complete, animated admin dashboard — React 18 + TypeScript + Tailwind CSS + Framer Motion + Recharts.

## Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — you'll land on the Login page.  
**Any email + any password** logs you in (fake auth, no backend needed).

---

## What's included

### Auth (fake token system)
- Token stored in `localStorage` as `nova_token`
- User profile stored in `localStorage` as `nova_user`
- Simulates `/me`, `/me PATCH`, `/me/avatar POST` endpoints
- Changes (name, email, bio, avatar, notification prefs) **persist across page refreshes**
- Logout clears the token and redirects to login

### Pages
| Route | Page |
|---|---|
| `/auth/login` | Sign In |
| `/auth/register` | Create account |
| `/auth/forgot-password` | Reset link |
| `/` | Dashboard (stats, charts, orders) |
| `/ecommerce` | Products + orders table |
| `/calendar` | Month grid with events |
| `/profile` | Overview / Edit / Security tabs |
| `/tables/customers` | Searchable, sortable, paginated table |
| `/tables/invoices` | Filter by status |
| `/forms/elements` | Inputs, toggles, checkboxes |
| `/forms/new-product` | Drag-and-drop image upload form |
| `/charts/basic` | Line, Bar, Area charts |
| `/charts/pie` | Pie + Radial charts |
| `/settings` | General, Notifications, Billing, Appearance |

### Features
- ✅ Fully responsive: off-canvas sidebar on mobile, collapsible on desktop
- ✅ Dark / Light mode toggle (Settings → Appearance or header button)
- ✅ Loading bar + skeleton screens during page transitions
- ✅ Profile image upload (resized to 256×256, stored as base64)
- ✅ All form changes persist in localStorage (name, email, bio, prefs, avatar)
- ✅ `prefers-reduced-motion` respected

---

## Swap in a real backend

When you're ready to connect a real API, replace `src/context/AuthContext.tsx`:

```ts
// fakeLogin → real POST /auth/login
const res = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
})
const { token, user } = await res.json()
localStorage.setItem('nova_token', token)

// fakeMe → real GET /me
const me = await fetch('/api/me', {
  headers: { Authorization: `Bearer ${localStorage.getItem('nova_token')}` }
})

// updateProfile → real PATCH /me
// uploadAvatar → real POST /me/avatar (multipart or base64)
```

Everything else (UI, routing, state) stays the same.
