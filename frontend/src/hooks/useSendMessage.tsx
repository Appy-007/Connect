import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage=()=>{
    const [loading,setLoading]=useState(false)
    const {messages,setmessages,selectedConversation}=useConversation()

    const sendMessage=async(message:string)=>{
        if(!selectedConversation)
            return
        try {
            setLoading(true)
            const res=await fetch(`/api/message/send/${selectedConversation.id}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({message})
            }
                
            )
            const data=await res.json()
            if(!res.ok)
                throw new Error(data.error)
            setmessages([...messages,data])

            
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
            
        }
        finally{
            setLoading(false)
        }

    }

    return {loading,sendMessage}
}

export default useSendMessage