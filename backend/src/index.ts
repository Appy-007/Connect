import express from "express"
import authrouter from "./routes/authroute.js"
import messagerouter from "./routes/messageroute.js"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import {app, server } from "./socket/socket.js"
import path from "path"




dotenv.config()




const port=7000

const __dirname=path.resolve()



app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authrouter)
app.use('/api/message',messagerouter)

if(process.env.NODE_ENV != 'development'){
    app.use(express.static(path.join(__dirname,'/frontend/dist')))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
    })
}


server.listen(port,()=>{
   
    console.log(`Server is running on port ${port}`)
    
})

