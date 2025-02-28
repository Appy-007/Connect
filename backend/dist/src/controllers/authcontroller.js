import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullname, username, gender, password, confirmPassword } = req.body;
        if (!username || !fullname || !gender || !password || !confirmPassword) {
            res.status(400).json({ error: "Please fill all the fields" });
            return;
        }
        if (password != confirmPassword) {
            res.status(400).json({ error: "Passwords do not match" });
            return;
        }
        const user = await prisma.user.findUnique({ where: { username: username } });
        if (user) {
            res.status(400).json({ error: "User already exists !!" });
            return;
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedpasword = await bcryptjs.hash(password, salt);
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newuser = await prisma.user.create({
            data: {
                username,
                fullname,
                password: hashedpasword,
                gender,
                profilepic: gender === 'male' ? boyprofilepic : girlprofilepic,
            },
        });
        if (newuser) {
            generateToken(newuser.id, res);
            res.status(200).json({
                id: newuser.id,
                username: newuser.username,
                fullname: newuser.fullname,
                profilepic: newuser.profilepic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
            return;
        }
    }
    catch (error) {
        console.log("Error in signup controller");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Please fill all the fields" });
            return;
        }
        const user = await prisma.user.findUnique({ where: { username: username } });
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            profilepic: user.profilepic
        });
    }
    catch (error) {
        console.log("Error in login controller");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfullt" });
    }
    catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        res.status(200).json({
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            profilepic: user.profilepic
        });
    }
    catch (error) {
        console.log("Error in getMe controller");
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
