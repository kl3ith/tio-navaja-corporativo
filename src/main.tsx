import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Tipografías autoalojadas: se empaquetan con el sitio, sin CDN ni Google Fonts.
// Sólo el subconjunto latino, que es el que cubre el español completo.
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/latin-700-italic.css'
import '@fontsource/archivo/latin-400.css'
import '@fontsource/archivo/latin-600.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/archivo/latin-800.css'
import '@fontsource/caveat/latin-500.css'

import './styles/global.css'
import './styles/app.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
