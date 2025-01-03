import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from '../context/Auth.Context.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Admin from './Admin.jsx'



const router = createBrowserRouter([{
  path: "/",
  element: <App/>
},{
  path: "/admin",
  element: <Admin/>
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
  <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)
