import express from "express";
import authrouter from "./routes/authroute.js";
import messagerouter from "./routes/messageroute.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
dotenv.config();
const port = 7000;
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authrouter);
app.use('/api/message', messagerouter);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
