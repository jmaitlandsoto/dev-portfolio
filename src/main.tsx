import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.js'
import './index.css'
import './App.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error("No element with id 'root' found")
}

// Unlinked utility route: renders the particle background as a LinkedIn
// banner for download. Lazy so the main bundle doesn't carry it.
const BannerPage = React.lazy(() => import('./components/BannerPage'))
const isBanner = window.location.pathname.replace(/\/$/, '') === '/banner'

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {isBanner ? (
      <React.Suspense fallback={null}>
        <BannerPage />
      </React.Suspense>
    ) : (
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    )}
  </React.StrictMode>,
)
