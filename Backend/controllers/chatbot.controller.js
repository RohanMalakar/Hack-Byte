import Chatbot from '../models/chatbot.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new chat room
export const createChatRoom = async (req, res) => {
  try {
    
    const { user_name, title } = req.body;
    if (!user_name || !title) {
      return res.status(400).json({ message: 'User name and title are required' });
    }
    
    
    if(req.user.user_name != user_name) {
      return res.status(403).json({ message: 'Unauthorized user' });
    }

    const chat_room_id = uuidv4();
    
    const newChat = new Chatbot({
      chat_room_id,
      user_name,
      title,
      messages: []
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create chat room', error: err.message });
  }
};

// Get chat by chatRoomId
export const getChatByRoomId = async (req, res) => {
  try {
    const { chat_room_id } = req.params;

    const chat = await Chatbot.findOne({ chat_room_id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat', error: err.message });
  }
};

// Add a new message to chat
export const addMessageToChat = async (req, res) => {
  try {
    const { chat_room_id } = req.params;
    const { sender, message } = req.body;

    const chat = await Chatbot.findOne({ chat_room_id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.messages.push({ sender, message });
    chat.updatedAt = Date.now();

    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add message', error: err.message });
  }
};

export const getAllChatRooms = async (req, res) => {  
  try {
    console.log(req.user.user_name);
    const chats = await Chatbot.find({ user_name: req.user.user_name });
    console.log(chats);
    if (!chats) return res.status(404).json({ message: 'No chat rooms found' });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat rooms', error: err.message });
  }
}
