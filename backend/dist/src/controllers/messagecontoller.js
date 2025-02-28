import prisma from "../db/prisma.js";
import { getreceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = await prisma.conversation.findFirst({ where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId]
                }
            } });
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId]
                    }
                }
            });
        }
        const newMesage = await prisma.message.create({
            data: {
                senderId: senderId,
                body: message,
                conversationId: conversation.id
            }
        });
        if (newMesage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMesage.id,
                        }
                    }
                }
            });
        }
        const receiverSocketId = getreceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMesage);
        }
        res.status(201).json(newMesage);
    }
    catch (error) {
        console.log("Error in sending message", error.message);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({ where: {
                participantsIds: {
                    hasEvery: [senderId, userToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
        if (!conversation) {
            res.status(201).json([]);
            return;
        }
        res.status(201).json(conversation.messages);
    }
    catch (error) {
        console.log("Error in receiving messages", error.message);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
export const getUsersForSidebar = async (req, res) => {
    try {
        const authuserid = req.user.id;
        const users = await prisma.user.findMany({ where: {
                id: {
                    not: authuserid
                }
            },
            select: {
                id: true,
                fullname: true,
                profilepic: true
            }
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error in fetching users", error.message);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
