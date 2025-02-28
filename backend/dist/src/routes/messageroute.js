import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessage, getUsersForSidebar } from '../controllers/messagecontoller.js';
const messagerouter = express.Router();
messagerouter.get('/conversations', protectRoute, getUsersForSidebar);
messagerouter.get('/:id', protectRoute, getMessage);
messagerouter.post('/send/:id', protectRoute, sendMessage);
export default messagerouter;
