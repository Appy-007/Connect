import express from 'express';
import { login, logout, signup, getMe } from '../controllers/authcontroller.js';
import protectRoute from '../middleware/protectRoute.js';
const authrouter = express.Router();
authrouter.post('/login', login);
authrouter.post('/logout', logout);
authrouter.post('/signup', signup);
authrouter.get('/me', protectRoute, getMe);
export default authrouter;
