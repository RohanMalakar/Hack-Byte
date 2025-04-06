import Chatbot from '../models/chatbot.model.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';

// Create a new chat room
export const createChatRoom = async (req, res) => {
  try {

    console.log("Creating chat room for user:", req.user.user_name);
    
    const { user_name, title } = req.body;
    if (!user_name || !title) {
      return res.status(400).json({ message: 'User name and title are required' });
    }
    
  
    if(req.user.user_name != user_name) {
      return res.status(403).json({ message: 'Unauthorized user' });
    }

    const chat_room_id = uuidv4();
    console.log("Generated chat room ID:", chat_room_id);
    const newChat = new Chatbot({
      chat_room_id,
      user_name,
      title,
      messages: []
    });
    console.log("New chat room created:", newChat);
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
// Add a new message to chat
export const addMessageToChat = async (req, res) => {
  try {
    const { chat_room_id } = req.params;
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ message: 'Sender and message are required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const chat = await Chatbot.findOne({ chat_room_id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    // Add the user's message to the chat
    chat.messages.push({ sender, message });
    chat.updatedAt = Date.now();

    // Predefined Q&A for Gemini
    const predefinedQA = [
      { input: "Hi", output: "Hi! Welcome to Sahayak. How can I assist you today?" },
      { input: "Hello", output: "Hello there! 👋 I'm your Sahayak assistant. How may I help you today?" },
      { input: "Hey", output: "Hey! I'm here to assist you. What can I help you with?" },
      { input: "What is Sahayak?", output: "Sahayak bridges the gap between people who want to report issues like eve-teasing, broken streetlights, lack of security cameras, etc., and organizations willing to address them. We provide a centralized platform to make reporting easy and effective." },
      { input: "Tell me about this platform", output: "Sahayak is designed to make society safer, especially for women. Here, users can report local safety issues anonymously or publicly, read safety blogs, access helplines, and organizations can track and solve reported issues." },
      { input: "How do I report an issue?", output: "You can create a post by clicking the 'Create Post' button. Add a description of the issue, location, keywords, and images if available. You can choose to post anonymously too." },
      { input: "Can I upload photos while reporting?", output: "Yes! You can add images when creating your post to make the issue clearer for organizations." },
      { input: "Is my identity hidden when I post?", output: "Yes, you can choose to post anonymously if you wish. Your identity will be kept confidential." },
      { input: "Can others see my post?", output: "Yes, posts are public to everyone unless you specifically choose anonymity. Organizations can view and take action based on them." },
      { input: "How do I find posts about my area?", output: "You can filter posts based on location, keywords, or categories using the search filters on the platform." },
      { input: "Can NGOs see my reports?", output: "Yes, NGOs and organizations can view public reports. They can mark issues as 'in consideration' or 'solved'." },
      { input: "What happens after I post?", output: "After you post, NGOs or organizations may take action on your report. You can track the status updates such as 'In Consideration' or 'Solved'." },
      { input: "Where can I find safety tips?", output: "You can read safety blogs and tips under the 'Blogs' section. We regularly post articles like security advice, user experiences, and self-defense tips." },
      { input: "What helplines are available?", output: "You can access important helplines for emergencies directly from our platform. Visit the 'Helplines' section in the menu." },
      { input: "How can I contact you?", output: "You can reach us through the 'Contact Us' page on the platform. Fill out the form, and our team will get back to you soon." },
      { input: "Tell me about the team behind Sahayak", output: "We are a passionate team of 4 developers: Bhoomi (Frontend Developer and Team Lead), Ayushi Ranjan (Frontend Developer and UX Designer), Rohan Malakar (Backend Developer), and Neelesh Baghel (Backend Developer and Technical Support). Our goal is to create a safer society for women." },
      { input: "Can I remain anonymous?", output: "Yes, you have the option to post anonymously. Your name and identity will not be shared." },
      { input: "How does Sahayak make a difference?", output: "Sahayak centralizes local safety reports and connects them with NGOs and organizations willing to help. It makes minor but important issues like broken streetlights or eve-teasing visible and actionable, creating a safer environment for all." }
    ];

    // Check if the user's message matches any predefined input
    const predefinedResponse = predefinedQA.find((qa) => qa.input.toLowerCase() === message.toLowerCase());

    let botResponse;
    if (predefinedResponse) {
      // Use predefined response if available
      botResponse = predefinedResponse.output;
    } else {
      // Use Gemini LLM for generating a response
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

      const geminiChat = model.startChat({
        history: chat.messages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.message }]
        }))
      });

      const result = await geminiChat.sendMessage(message);
      botResponse = result.response.text();
    }

    // Add the bot's response to the chat
    chat.messages.push({ sender: 'bot', message: botResponse });
    chat.updatedAt = Date.now();

    // Save the updated chat
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.error("Error in addMessageToChat:", err);
    res.status(500).json({ message: 'Failed to add message', error: err.message });
  }
};
export const getAllChatRooms = async (req, res) => {  
  try {
    const chats = await Chatbot.find({ user_name: req.user.user_name });
    if (!chats) return res.status(404).json({ message: 'No chat rooms found' });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chat rooms', error: err.message });
  }
}