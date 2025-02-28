import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ error: "Unauthorized : No token found" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ error: "Unauthorized : No token found" });
            return;
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullname: true, profilepic: true } });
        if (!user) {
            res.status(404).json({ error: "user not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json("Internal server error");
        console.log("Error in protectRoute middleware", error.message);
        return;
    }
};
export default protectRoute;
