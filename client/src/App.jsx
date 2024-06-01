import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile'
import Otp from './pages/Otp';
import Navbar from './pages/Navbar';
import Setting from './pages/Setting';
import ChangePassword from './pages/ChangePassword';
import ChangeUsername from './pages/ChangeUsername';
import ChangeEmail from './pages/ChangeEmail';
import Pagenotfound from './pages/Pagenotfound';
import PrivateRoute from './context/PrivateRoute';



function App() {

  return (
   <div>
    <Router>

        <AuthProvider> 
      <Routes>
      <Route path='/' element ={<Login/>} />
      <Route path='/signup' element ={<SignUp/>} />
      <Route path='/verify-email' element={<VerifyEmail/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route path='/otp-verification' element={<Otp/>} />
      <Route path='/navigation' element={<Navbar/>} />
      {/* Prevent unauthorized access */}
      <Route element={<PrivateRoute/>}>
      <Route path='/setting' element={<Setting/>} />
      <Route exact path='/changepassword' element={<ChangePassword/>} />
      <Route exact path='/changeusername' element={<ChangeUsername/>} />
      <Route exact path='/changeemail' element={<ChangeEmail/>} />
      <Route exact path='/userprofile' element={<Profile/>} />
      </Route>
      <Route path='/*' element={<Pagenotfound />}/>
      </Routes>
      </AuthProvider>
    </Router>
   </div>
  )
}

export default App
