import Conversation from "./Conversation"

import useGetConversation from "../hooks/useGetConversations"
import Loader from "./Loader"

function Conversations(){
    const {conversations,loading}=useGetConversation()
    return( 
        loading ? <Loader/> :
        <>
        <div className="flex flex-col mt-4 overflow-auto">
            {/* {DUMMY_CONVERSATIONS && DUMMY_CONVERSATIONS.map((conversation)=><Conversation key={conversation.id} conversation={conversation}/>)} */}
            {conversations.map((conversation)=><Conversation key={conversation.id} conversation={conversation} />)}
            
        </div>
        </>
    )
}

export default Conversations