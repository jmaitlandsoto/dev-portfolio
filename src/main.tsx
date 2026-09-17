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

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
