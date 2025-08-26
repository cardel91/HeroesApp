import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from './components/ui/button'
// import App from /'./App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <h1>Ola k ase</h1>
    <Button>Ola k ase</Button>

  </StrictMode>,
)
