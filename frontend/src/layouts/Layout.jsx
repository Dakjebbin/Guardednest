
import Header from '../Home/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Home/Footer'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout