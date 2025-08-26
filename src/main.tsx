import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroesApp } from './HeroesApp'
import './index.css'
// import App from /'./App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <HeroesApp />

  </StrictMode>,
)
