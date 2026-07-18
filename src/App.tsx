import React from "react"
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useAuth } from './context/AuthContext'

// ── Lazy page imports ──────────────────────────────────────────────────────
// Using lazy + Suspense: chunks load on demand, Loading shown on first visit.
const Loading           = lazy(() => import('./pages/loading/index'))
const Layout            = lazy(() => import('./components/layout/Layout').then(m => ({ default: m.Layout })))

// Auth
const Login             = lazy(() => import('./pages/auth/Login'))
const Register          = lazy(() => import('./pages/auth/Register'))
const ForgotPassword    = lazy(() => import('./pages/auth/ForgotPassword'))

// App pages
const Dashboard         = lazy(() => import('./pages/Dashboard'))
const Ecommerce         = lazy(() => import('./pages/Ecommerce'))
const CalendarPage      = lazy(() => import('./pages/CalendarPage'))
const Profile           = lazy(() => import('./pages/Profile'))
const ProductsPage      = lazy(() => import('./pages/products/index'))
const CustomersTable    = lazy(() => import('./pages/tables/CustomersTable'))
const InvoicesTable     = lazy(() => import('./pages/tables/InvoicesTable'))
const FormElements      = lazy(() => import('./pages/forms/FormElements'))
const NewProduct        = lazy(() => import('./pages/forms/NewProduct'))
const BasicCharts       = lazy(() => import('./pages/charts/BasicCharts'))
const PieCharts         = lazy(() => import('./pages/charts/PieCharts'))
const Settings          = lazy(() => import('./pages/Settings'))
const NotFound          = lazy(() => import('./pages/NotFound'))

// ── Query client ───────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } }
})

// ── Route guard ────────────────────────────────────────────────────────────
const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // isAuthed is sync-initialized from localStorage — no redirect flash.
  const { isAuthed } = useAuth()
  if (!isAuthed) return <Navigate to="/auth/login" replace />
  return <>{children}</>
}

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Suspense fallback: shown while a lazy chunk loads for the first time */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* ── Public (auth) ─────────────────────────────────────────── */}
          <Route path="/auth/login"           element={<Login />} />
          <Route path="/auth/register"        element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          {/* ── Protected (inside layout) ──────────────────────────────── */}
          <Route element={<Protected><Layout /></Protected>}>
            <Route path="/"                    element={<Dashboard />} />
            <Route path="/ecommerce"           element={<Ecommerce />} />
            <Route path="/calendar"            element={<CalendarPage />} />
            <Route path="/profile"             element={<Profile />} />
            <Route path="/products"            element={<ProductsPage />} />
            <Route path="/tables/customers"    element={<CustomersTable />} />
            <Route path="/tables/invoices"     element={<InvoicesTable />} />
            <Route path="/forms/elements"      element={<FormElements />} />
            <Route path="/forms/new-product"   element={<NewProduct />} />
            <Route path="/charts/basic"        element={<BasicCharts />} />
            <Route path="/charts/pie"          element={<PieCharts />} />
            <Route path="/settings"            element={<Settings />} />
            <Route path="*"                    element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      {/* ── Sonner toast container ────────────────────────────────────── */}
      <Toaster
        position="top-right"
        richColors
        expand={false}
        toastOptions={{
          duration: 3500,
          classNames: {
            toast: '!rounded-xl !font-sans !text-sm !shadow-glass',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
