/* eslint-disable react-refresh/only-export-components */
import io ,{Socket} from 'socket.io-client'
import { useAuthContext } from './AuthContext'
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

interface ISocketCotext{
    socket:Socket |null;
    onlineusers:string[];
}

const SocketContext=createContext<ISocketCotext | undefined>(undefined)

const socketURL=import.meta.env.NODE_ENV == 'development' ? 'http://localhost:7000' :'/'

export const useSocketContext=():ISocketCotext=>{
    const context=useContext(SocketContext)
    if(context === undefined){
        throw new Error("useSocketContext must be used within a socketContextProvider")
    }
    return context

}

export const SocketContextProvider=({children}:{children:ReactNode})=>{
    const socketRef=useRef< Socket |null>(null)
    const [onlineusers,setOnlineusers]=useState<string[]>([])
    const {authUser,isLoading}=useAuthContext()

    useEffect(()=>{
        
        if(authUser && !isLoading){
            
            const socket=io(socketURL,{
                query:{
                    userId:authUser.id,
                },
                transports: ['websocket'],
                path: '/api/socket.io',
                timeout: 10000, 
                

            })
            socketRef.current=socket
            
            
            socket.on('getOnlineUsers',(users:string[])=>{
                setOnlineusers(users)

            });

            return ()=>{
                socket.close()
                socketRef.current=null
            }
        }
        else if(!authUser && !isLoading){
            if(socketRef.current){
                socketRef.current.close()
                socketRef.current=null
            }
        }

    },[authUser,isLoading])

    return (
        <SocketContext.Provider value={{socket:socketRef.current,onlineusers}}>
            {children}
        </SocketContext.Provider>
    )


}

