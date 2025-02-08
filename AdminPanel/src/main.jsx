import { StrictMode } from 'react'
import "./index.css";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from '../context/Auth.Context.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Admin from './Admin.jsx'
import AdminTransaction from './AdminTransaction.jsx'
import UserDetails from './UserDetails.jsx'





const router = createBrowserRouter([{
  path: "/",
  element: <App/>
},{
  path: "/admin",
  element: <Admin/>
},{
  path: "/transactions/:id",
  element: <AdminTransaction/>
},{
  path: "/userCard/:id",
  element: <UserDetails/>
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
  <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)
