/**
 * React.StrictMode intentionally removed.
 * In React 18 dev mode, StrictMode double-mounts every component.
 * Framer Motion's AnimatePresence keeps both the entering and
 * exiting components in the DOM during this double-mount cycle,
 * which causes page content to visually appear twice.
 */
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)
