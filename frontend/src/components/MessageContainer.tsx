import MessageInput from "./MessageInput"
import Messages from "./Messages"
import useConversation from "../zustand/useConversation"
import NoChatSelected from "./NoChatSelected"
import { useAuthContext } from "../context/AuthContext"
import Loader from "./Loader"


function MessageContainer(){
    const {selectedConversation}=useConversation()
    const {isLoading}=useAuthContext()
    


    
    return(

        isLoading ? <Loader/> :
        <>
        <div className="w-full flex flex-col gap-2 relative">
            {!selectedConversation ? <NoChatSelected/> : (
            <>
            <div className="bg-gray-500 py-2 px-2">
            <p className="text-white text-sm"><span className="text-gray-300">To:</span>{selectedConversation.fullname} </p>
            </div>
            <Messages/>
            <div className="mt-auto mb-1 w-full">
            <MessageInput/>
            </div>
            
            </>
            )}
            

        </div>
        </>
    )
}

export default MessageContainer