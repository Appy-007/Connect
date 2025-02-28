import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast";


const useGetMessages=()=>{
    const [loading,setLoading]=useState(false);
    
    const {selectedConversation,messages,setmessages}=useConversation()

    useEffect(()=>{
        const getMessages=async()=>{

            if(!selectedConversation){
                return ;
            }

            try {
                setLoading(true)
                setmessages([])
                const res=await fetch(`/api/message/${selectedConversation?.id}`)
                const data=await res.json()
                if(! res.ok)
                    throw new Error(data.error)
                setmessages(data)

                
            } catch (error:any) {
                console.log(error.message)
                toast.error(error.message)
                
            }
            finally{
                setLoading(false)
            }

        }

        getMessages()

    },[selectedConversation,setmessages])

    return {loading,messages}


}

export default useGetMessages