import { useEffect, useState } from "react"

import { ConversationType } from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetConversation=()=>{
    
    const [loading,setLoading]=useState(false)
    const [conversations,setConversations]=useState<ConversationType[]>([])

    useEffect(()=>{
        const getConversations=async()=>{
            try {
                setLoading(true)
                const res=await fetch('api/message/conversations')
                const data=await res.json()
                if(! res.ok){
                    throw new Error(data.error)
                }
                setConversations(data)
                
            } catch (error:any) {
                console.log(error.message)
                toast.error(error.message)
                
            }
            finally{
                setLoading(false)
            }

        }

        getConversations()

    },[])

    return {loading,conversations}

}

export default useGetConversation