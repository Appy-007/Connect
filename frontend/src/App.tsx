import { Routes,Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { useAuthContext } from "./context/AuthContext"
import {Toaster} from 'react-hot-toast'
import Logo from '../src/assets/icons8-chat-bubble-48.png'



function App() {
  const {authUser,isLoading}=useAuthContext()
 

  
  

  return !isLoading ? (
    
    <>
      <div className="p-4 h-screen  flex items-center justify-center relative">
        
        <Routes>
          <Route path="/" element={authUser? < Home/> : <Navigate to={'/login'}/>}/>
          <Route path="/login" element={!authUser? <Login/> : <Navigate to={'/'}/>}/>
          <Route path="/signup" element={!authUser? <Signup/> : <Navigate to={'/'}/>}/>
          
        </Routes>
        <div className=" text-blue-600 text-sm md:text-2xl font-bold pb-2 pr-1 mt-6 absolute bottom-1 right-1 " > <img src={Logo} alt="" className="h-10 max-md:hidden"/> <p>Connect</p></div>
        <Toaster />
        
        
       

      </div>
    </> 
  ) : null
}

export default App
