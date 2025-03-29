import './App.css'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import Dashboard from './Pages/Dashboard';
import AddClient from './Pages/AddClient';
import ClientList from './Pages/ClientList';
import EditClient from './Pages/EditClient';
import AddContent from './Pages/AddContent';
import ContentList from './Pages/ContentList';
import EditContent from './Pages/EditContent';
import ViewContent from './Pages/ViewContent';
import VerifyContent from './Pages/VerifyContent';
import ModifyContent from './Pages/ModifyContent';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/' element={<HomePage/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/addclient' element={<AddClient/>} />
        <Route path='/clientlist' element={<ClientList/>} />
        <Route path='/editclient' element={<EditClient/>} />
        <Route path='/addcontent' element={<AddContent/>} />
        <Route path='/contentlist' element={<ContentList/>} />
        <Route path='/editcontent' element={<EditContent/>} />
        <Route path='/viewcontent' element={<ViewContent/>} />
        <Route path='/verifycontent' element={<VerifyContent/>} />
        <Route path='/modifycontent' element={<ModifyContent/>} />
    </Routes>
    </Router>
  )   
}

export default App
