import { Server } from "socket.io";
import { createServer } from 'http';
import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST'],
        allowedHeaders: ["Authorization"],
        credentials: true,
    },
    path: '/api/socket.io',
});
export const getreceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket?.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});
export { app, io, server };
