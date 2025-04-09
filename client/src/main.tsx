import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './UserAuth/User.tsx'
import { ThemeProvider } from './Theme/Theme.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
     <UserProvider>
      <App />  
     </UserProvider>
    </ThemeProvider>
  </BrowserRouter>
 
)
