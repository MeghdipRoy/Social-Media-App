import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.scss'
import { DarkModeContextProvider } from './context/darkModeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <DarkModeContextProvider>
    <AuthContextProvider>
    <App/>
    </AuthContextProvider>
  </DarkModeContextProvider>
    
   
    
  // </React.StrictMode>,
)
