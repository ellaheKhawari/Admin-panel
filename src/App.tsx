import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { useAuth } from './context/AuthContext'

import Dashboard from './pages/Dashboard'
import Ecommerce from './pages/Ecommerce'
import CalendarPage from './pages/CalendarPage'
import Profile from './pages/Profile'
import CustomersTable from './pages/tables/CustomersTable'
import InvoicesTable from './pages/tables/InvoicesTable'
import FormElements from './pages/forms/FormElements'
import NewProduct from './pages/forms/NewProduct'
import BasicCharts from './pages/charts/BasicCharts'
import PieCharts from './pages/charts/PieCharts'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

/** Redirect to /auth/login if not authenticated */
const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthed } = useAuth()
  if (!isAuthed) return <Navigate to="/auth/login" replace />
  return <>{children}</>
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      <Route element={<Protected><Layout /></Protected>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tables/customers" element={<CustomersTable />} />
        <Route path="/tables/invoices" element={<InvoicesTable />} />
        <Route path="/forms/elements" element={<FormElements />} />
        <Route path="/forms/new-product" element={<NewProduct />} />
        <Route path="/charts/basic" element={<BasicCharts />} />
        <Route path="/charts/pie" element={<PieCharts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
