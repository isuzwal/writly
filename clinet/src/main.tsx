import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './UserAuth/User.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserProvider>
   <App />  
  </UserProvider>
  </BrowserRouter>
 
)
