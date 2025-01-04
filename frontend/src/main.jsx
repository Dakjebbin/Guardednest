import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import About from './Home/About.jsx'
import Services from './Home/Services.jsx'
import Contact from './Home/Contact.jsx'
import Signup from './Home/Signup.jsx'
import Login from './Home/Login.jsx'
import { AuthContextProvider } from './context/auth.context.jsx'
import Human from './Home/Human.jsx'
import Policy from './Home/Policy.jsx'
import Terms from './Home/Terms.jsx'
import Faq from './Home/Faq.jsx'
import Dash from './User/Dash.jsx'
import Fund from './User/Fund.jsx'
import Payment from './User/Payment.jsx'
import Confirmation from './User/Confirmation.jsx'
import Withdraw from './User/Withdrawals.jsx'
import Select from './User/Select.jsx'
import Transactions from './User/Transactions.jsx'
import Bank from './User/Bank.jsx'
import Paypal from './User/Paypal.jsx'
import Crypto from './User/Crypto.jsx'
import Cashapp from './User/Cashapp.jsx'
import Settings from './User/Settings.jsx'
import { ErrorBoundary } from "react-error-boundary";
import NotFound from './User/Notfound.jsx'


const router = createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              index: true,
              element: <App />,
            },{
              path: 'about',
              element: <About/>
            },{
              path: "services",
              element: <Services/>
            },{
              path: "contact",
              element: <Contact/>
            },{
              path: "signup",
              element: <Signup/>
            },{
              path: "login",
              element: <Login/>
            },{
              path:"humanrights",
              element: <Human/>
            },{
              path: "policy",
              element: <Policy/>
            },{
              path: "terms",
              element: <Terms/>
            },{
              path: "faq",
              element: <Faq/>
            }
          ]
        },{
          path: "/user",
          element: <Dash/>
        },
        {
          path:"/user/fund",
          element: <Fund/>
        },
        {
          path:"/user/fund/payment",
          element: <Payment/>
        },{
          path: "/user/fund/payment/confirmation",
          element: <Confirmation/>
        },{
          path:"/user/withdrawals",
          element: <Withdraw/>
        },{
          path:"/user/withdrawals/select",
          element: <Select/>
        },{
          path: "/user/transactions",
          element: <Transactions/>
        },{
          path: "/user/withdrawals/select/bank",
          element: <Bank/>
        },{
          path: "/user/withdrawals/select/paypal",
          element: <Paypal/>
        },{
          path: "/user/withdrawals/select/crypto",
          element: <Crypto/>
        },{
          path: "/user/withdrawals/select/cashapp",
          element: <Cashapp/>
        },{
          path: "/user/settings",
          element: <Settings/>
        },
        {
          path: '*',
          element: <NotFound />,
        },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthContextProvider> 
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <RouterProvider router={router} />
    </ErrorBoundary>
     </AuthContextProvider> 
  </React.StrictMode>
)
