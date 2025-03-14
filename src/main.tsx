import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient()}>
    <Router />
  </QueryClientProvider>
)
