import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogOut=()=>{
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const logout=async ()=>{
        try {
            setLoading(true)
            
            const res=await fetch('/api/auth/logout',{
                method:'POST',
                
            })
            const data=await res.json()
            if(! res.ok){
                throw new Error(data.error)
            }
            setAuthUser(null)
            
            
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
            
        }
        finally{
            setLoading(false)
        }

    }

    return {logout,loading}
}

export default useLogOut