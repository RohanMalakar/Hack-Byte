import { Router } from "express";
import {createChatRoom,getChatByRoomId,addMessageToChat,getAllChatRooms} from "../controllers/chatbot.controller.js";
import { isloggedIn } from "../middlewares/auth.middleware.js";
const chatbotRouter = Router();

chatbotRouter.post("/create/chatroom",isloggedIn, createChatRoom);
chatbotRouter.get("/get_all_chat_rooms", isloggedIn, getAllChatRooms);
chatbotRouter.get("/get/:chat_room_id",isloggedIn, getChatByRoomId);
chatbotRouter.post("/add_message/:chat_room_id",isloggedIn, addMessageToChat);

export default chatbotRouter;