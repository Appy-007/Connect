import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useSignUp=()=>{
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()
    type SignupInputs={
        fullname:string,
        username:string,
        password:string,
        confirmPassword:string,
        gender:string
    }

    const signup=async(inputs:SignupInputs)=>{
        try {
            setLoading(true)
            const res=await fetch('/api/auth/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(inputs)
            })
            const data=await res.json()
            if(! res.ok){
                throw new Error(data.error)
            }
            setAuthUser(data)
        
            
            
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
            
        }
        finally{
            setLoading(false)
        }
    }

    return {signup,loading}
}

export default useSignUp