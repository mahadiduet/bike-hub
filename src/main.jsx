import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/Routes.jsx'
import FirebaseProvider from './FirebaseProvider/FirebaseProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'; 

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <FirebaseProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </QueryClientProvider>
      </FirebaseProvider>
      </HelmetProvider>
  </StrictMode>,
)
