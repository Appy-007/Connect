import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import useGetConversation from "../hooks/useGetConversations";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { ConversationType } from "../zustand/useConversation";

function Searchbar(){
    const [searchitem,setSearchitem]=useState("")
    const {conversations}=useGetConversation()
    const {setselectedConversation}=useConversation()

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!searchitem)
            return
        if(searchitem.length <3)
            return toast.error("Search item must be 3 characters long")
        const conversation=conversations.find((c:ConversationType)=>c.fullname.toLowerCase().includes(searchitem.toLowerCase()))
        if(conversation){
            setselectedConversation(conversation)
            setSearchitem("")
        }
        else{
            toast.error("No such user found")
        }
    }
    return(
        <>
        <form className="flex items-center  py-2 justify-between gap-2" onSubmit={handleSubmit}>
            <input type="text" className="rounded-2xl bg-gray-800 w-full p-2 text-white text-xs md:text-sm" placeholder="search..." value={searchitem} onChange={(e)=>setSearchitem(e.target.value)} />
            <button className="rounded-full  h-7 w-8 flex items-center justify-center cursor-pointer bg-blue-600 hover:text-blue-600 hover:bg-white"><BsSearch className="outline-none w-4 h-4" /></button>
        </form>
        </>
    )
}

export default Searchbar