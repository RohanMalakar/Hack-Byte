import { Router } from "express";
import {createChatRoom,getChatByRoomId,addMessageToChat,getAllChatRooms} from "../controllers/chatbot.controller.js";
import { isloggedIn } from "../middlewares/auth.middleware.js";
const chatbotRouter = Router();

chatbotRouter.post("/create/chatroom",isloggedIn, createChatRoom);
chatbotRouter.get("/:chat_room_id",isloggedIn, getChatByRoomId);
chatbotRouter.get("/get_all_chat_rooms",isloggedIn, getChatByRoomId,getAllChatRooms);
chatbotRouter.post("/:chat_room_id/add_message",isloggedIn, addMessageToChat);

export default chatbotRouter;