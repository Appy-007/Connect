import useConversation from "../zustand/useConversation"
import { useSocketContext } from "../context/SocketContext"
import { useEffect } from "react"
import notification_sound from "../assets/sounds/notification-1-269296.mp3"

const useListenMessages=()=>{
    const {socket}=useSocketContext()
    const {messages,setmessages}=useConversation()

    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            setmessages([...messages,newMessage])
            const sound =new Audio(notification_sound)
            sound.play()
        })

        return () => {
            socket?.off("newMessage");
        };
    },[socket,messages,setmessages])

    

}

export default useListenMessages