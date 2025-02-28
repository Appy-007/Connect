/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConversationType } from "../zustand/useConversation"
import useConversation from "../zustand/useConversation"
import { useSocketContext } from "../context/SocketContext"
import onlineStatus from "../assets/icons8-select-48.png"

function Conversation({conversation}:{conversation:ConversationType}){
    const {selectedConversation, setselectedConversation}=useConversation()
    const isSelected=selectedConversation?.id === conversation.id
    const {onlineusers}=useSocketContext()

    const isonline=onlineusers.includes(conversation.id)
    
    return(
        
        <>
        <div className={`flex items-center gap-2 border-b p-2 cursor-pointer border-gray-400 ${isSelected && 'bg-blue-600'} `} onClick={()=>setselectedConversation(conversation)} >
            <div>
            <div className='w-4 md:w-12 rounded-full relative'>
				<img src={conversation.profilepic} alt='user avatar' />
                {isonline && <div className="absolute bottom-2 right-0" >
                <img src={onlineStatus} alt="" className="h-2 w-2 "/>
                </div> }
                
			</div>
            

            </div>
            <div className="text-xs md:text-sm flex flex-1 justify-between items-center">
                <p>{conversation.fullname}</p>

            </div>
        </div>
        </>
    )
}

export default Conversation