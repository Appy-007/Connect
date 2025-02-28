import {create} from 'zustand'

export type ConversationType={
    id:string,
    fullname:string,
    profilepic:string,
}

export type MessageType={
    id:string, 
    body:string,
    senderId:string,
    createdAt:string,

}

interface ConversationState{
    selectedConversation:ConversationType |null,
    messages:MessageType[],
    setselectedConversation:(conversation:ConversationType|null)=>void,
    setmessages:(message:MessageType[])=>void,
}

const useConversation=create<ConversationState>((set)=>({
    selectedConversation:null,
    setselectedConversation:(conversation)=>set({selectedConversation:conversation}),
    messages:[],
    setmessages:(message)=>set({messages:message})

}))

export default useConversation