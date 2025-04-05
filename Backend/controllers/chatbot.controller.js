import Chatbot from '../models/chatbot.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new chat room
export const createChatRoom = async (req, res) => {
  try {
    const { userName, title } = req.body;
    const chatRoomId = uuidv4();

    const newChat = new Chatbot({
      chatRoomId,
      userName,
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
    const { chatRoomId } = req.params;

    const chat = await Chatbot.findOne({ chatRoomId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat', error: err.message });
  }
};

// Add a new message to chat
export const addMessageToChat = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { sender, message } = req.body;

    const chat = await Chatbot.findOne({ chatRoomId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.messages.push({ sender, message });
    chat.updatedAt = Date.now();

    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add message', error: err.message });
  }
};
