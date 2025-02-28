/* eslint-disable @typescript-eslint/no-explicit-any */

import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { MessageType } from "../zustand/useConversation";
import { extractTime } from "../utils/extractTime"



function Message({message}:{message:MessageType}){
    const {authUser}=useAuthContext()
    const {selectedConversation}=useConversation()

    const fromMe=message.senderId===authUser?.id

    const img = fromMe
		? authUser?.profilepic
		: selectedConversation?.profilepic;
    return(
        
        <>
        <div className={`flex items-end gap-4 mb-2 ${fromMe ? 'justify-end':'justify-start'}`}>
        <div className='hidden md:block '>
				<div className='w-6 md:w-10 rounded-full'>
					<img src={img} alt="" />
				</div>
			</div>
            <div className="bg-blue-500 rounded-lg">
                <p className="py-0.5 md:py-1 px-1 text-xs md:text-sm">{message.body}</p>
                <span className=' opacity-50 text-xs flex gap-1 items-center text-white justify-end px-1'>{extractTime(message.createdAt)} </span>
            </div>     
        </div>
        </>
    )
}

export default Message