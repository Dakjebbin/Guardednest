import Admin from './Admin'
import AdminTransaction from './AdminTransaction'
import UserDetails from './UserDetails'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return(
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Admin />}></Route>
      <Route path='/admin/transactions/:username' element={<AdminTransaction />}></Route>
      <Route path='/admin/userdetails/:username' element={<UserDetails />}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App