import Message from "./Message"
import useGetMessages from "../hooks/useGetMessages"
import useListenMessages from "../hooks/useListenMessages"
import useChatScroll from "../hooks/useChatScroll"
import Loader from "./Loader"

function Messages(){

    
    
    const {messages,loading}=useGetMessages()
    const ref=useChatScroll(messages) as React.RefObject<HTMLDivElement>
    useListenMessages()
    return(
        loading ? <Loader/> :
        
        <>
        <div className="flex flex-col gap-2 px-0.5 overflow-auto" ref={ref}>
           
            {messages && messages.map((message)=><Message key={message.id} message={message}/>)}
           

            
        </div>
        {messages.length ==0  && <div className="flex items-center justify-center flex-wrap h-full"> <p className=" text-white text-xs md:text-lg font-bold ">Say hello to start conversation!!</p> </div>}
        </>
    )
}

export default Messages