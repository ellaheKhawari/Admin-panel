# Nova — Admin Panel v3

React 18 + TypeScript + Tailwind CSS + Framer Motion + Recharts + Sonner + TanStack Query

## Quick start

```bash
npm install
npm run dev
```

→ `http://localhost:5173` — lands on Login. **Any email + any password** works.

---

## v3 Changes

### Bug fixes
- **Navigation blank screen** — Root cause: `useState` in AuthContext was async (useEffect-based). On first render `isAuthed = false`, causing Protected to redirect to `/auth/login` mid-navigation. Fixed with **synchronous lazy init** from localStorage: `useState(() => localStorage.getItem(TOKEN_KEY))`.
- **Skeleton caused blank screen** — Removed the `showSkeleton` gate that hid `<Outlet />`. Now Outlet always renders; the loading bar is purely cosmetic.

### Architecture
- **`lazy` + `Suspense`**: Every page is code-split. First-visit loads the chunk, subsequent visits are instant.
- **Loading screen**: Full-screen animated Nova spinner (Framer Motion) shown during Suspense fallback.
- **`@tanstack/react-query`**: QueryClient provider wraps the app, ready for real API calls.
- **`sonner`**: Toast notifications for login welcome, profile save, avatar upload, product CRUD, settings save.

### New: Products page (`/products`)
- 12 real products with Unsplash photos that match each product
- Grid view (cards with hover scale + image zoom) and List view (full table)
- Search by name, SKU, category
- Filter by category tabs and status dropdown
- Sort by name, price, stock, sold
- **Edit drawer** — slides in from right, edit all fields, saves with toast
- **Delete modal** — confirm dialog, removes from list with toast
- Stats strip: total, active, out-of-stock, inventory value

### Toasts (Sonner, all in English)
| Event | Toast |
|---|---|
| Login | "Welcome back, Amir! 👋" |
| Register | "Account created! Welcome to Nova, Amir! 🎉" |
| Logout | "Signed out successfully." |
| Profile save | "Profile updated successfully!" |
| Avatar upload | "Profile photo updated!" |
| Product edit | "\"MacBook Pro 14" M4 Pro\" updated successfully." |
| Product delete | "\"MacBook Pro 14" M4 Pro\" has been deleted." |
| Settings save | "Settings saved!" |

---

## Replace with real backend

```ts
// AuthContext.tsx
const fakeLogin = async (email, password) => {
  const { token, user } = await fetch('/api/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password })
  }).then(r => r.json())
  localStorage.setItem('nova_token', token)
  // ...
}
```
