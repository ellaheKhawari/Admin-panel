<div align="center">

# ⚡ Nova — Admin Panel

**A fast, modern admin dashboard built with React & TypeScript**

Featuring code-split routing, an animated loading experience, a full products management module, and toast-driven feedback throughout.

[**🔗 Live Demo**](https://admin-panel.ellahe-khawari.workers.dev)

</div>

---

### About

Nova is a front-end admin panel showcase, demonstrating a production-style architecture: route-based code splitting, a mock authentication flow, and a fully interactive products management page. Every meaningful action in the app (login, saving a profile, editing a product, deleting a product, changing settings) is confirmed with a toast notification, making the UI feel alive and responsive even without a real backend.

There is **no real backend** — authentication is mocked, and any email + any password combination logs you in, so you can explore the whole dashboard instantly.

### ✨ Features

- 🔐 **Mock authentication** — log in with any email/password combination
- ⚡ **Route-based code splitting** (`lazy` + `Suspense`) — every page loads as its own chunk; first visit loads the code, subsequent visits are instant
- 🌀 **Animated loading screen** — a full-screen Nova spinner (Framer Motion) shown while a page chunk loads
- 📦 **Products page** (`/products`) with:
    - 12 sample products, each paired with a matching Unsplash photo
    - **Grid view** (cards with hover scale + image zoom) and **List view** (full data table)
    - Search by name, SKU, or category
    - Filter by category tabs and status dropdown
    - Sort by name, price, stock, or units sold
    - **Edit drawer** sliding in from the right to update any product field
    - **Delete confirmation modal**
    - A stats strip showing total products, active count, out-of-stock count, and total inventory value
- 🔔 **Toast notifications** (via Sonner) for every key action — login, registration, logout, profile updates, avatar upload, product edits/deletes, and settings changes
- 📊 Charts powered by **Recharts**, ready to visualize dashboard metrics
- 🔄 **TanStack React Query** wired in via a `QueryClient` provider, ready to be connected to a real API

### 🛠 Tech Stack

| Category | Technology |
|---|---|
| Core | React 18, TypeScript, Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Charts | Recharts |
| Data fetching | TanStack React Query |
| Notifications | Sonner |
| Icons | Lucide React |
| Utilities | clsx |

### 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — you'll land on the Login page. **Any email + any password** will log you in.

Build for production:

```bash
npm run build
npm run preview
```

### 🔑 Authentication

There is no real backend behind the login form — **any email and password combination will work.** This is intentional, to let anyone explore the dashboard without needing credentials.

Behind the scenes, the auth token is initialized **synchronously** from `localStorage` (`useState(() => localStorage.getItem(TOKEN_KEY))`), which avoids a subtle bug present in earlier versions where an async auth check briefly reported "not authenticated" and triggered an unwanted redirect to the login page during navigation.

To connect Nova to a real backend, replace the mock login call in `AuthContext.tsx` with an actual API request, for example:

```ts
// AuthContext.tsx
const login = async (email: string, password: string) => {
  const { token, user } = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());

  localStorage.setItem('nova_token', token);
  // ...set user state, redirect, etc.
};
```

### 🔔 Toast Notifications

Every important action gives instant feedback through a toast, for example:

| Event | Message |
|---|---|
| Login | Welcome-back greeting with the user's name |
| Register | Account-created welcome message |
| Logout | Sign-out confirmation |
| Profile save | Profile-updated confirmation |
| Avatar upload | Photo-updated confirmation |
| Product edit | Confirmation naming the updated product |
| Product delete | Confirmation naming the deleted product |
| Settings save | Settings-saved confirmation |

### 🧠 Architecture Notes

- **Code splitting:** every route is wrapped in `React.lazy` + `Suspense`, keeping the initial bundle small and pages loading on demand.
- **Loading state:** the Suspense fallback is a full-screen animated spinner rather than a blank screen or a skeleton that hides the outlet — the actual page content (`<Outlet />`) always renders once ready, so navigation never gets stuck.
- **Data layer:** a `QueryClient` (TanStack React Query) wraps the whole app, already structured so real API calls can be dropped in without restructuring components.

### 📄 License

This project is licensed under the [MIT License](LICENSE).
