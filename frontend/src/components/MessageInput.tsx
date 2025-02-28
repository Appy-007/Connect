
import { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import useSendMessage from "../hooks/useSendMessage";


function MessageInput(){
    const [message,setMessage]=useState("")
    const {sendMessage}=useSendMessage()

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!message.trim())
            return
        await sendMessage(message)
        setMessage("")


    }
    return(
        <>
        <div>
            <form action="" className="mx-1   relative" onSubmit={handleSubmit}>
                <input type="text" className=" bg-gray-800 w-full rounded-2xl  text-gray-300 p-2" placeholder="Send a message" value={message}  onChange={(e)=>setMessage(e.target.value)} />
                <button className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"><BsSendFill/></button>
            </form>
            
        </div>
        </>
    )
}

export default MessageInput