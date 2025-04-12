import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import axiosInstance from '../../helper/axiosinstance';

const ChatbotInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const user_name= localStorage.getItem('user_name') || 'bhoomi'; 
  const [userName, setUserName] = useState(user_name); // Fixed setter name

  const messagesEndRef = useRef(null);
  const [chatRoomId, setChatRoomId] = useState('ad9e12c8-0cd6-47ae-abdb-25853896258a');
  const apiUrl = `/chatbot/get/${chatRoomId}`;

  const fetchChatHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(apiUrl);
      console.log('Chat history response:', response.data);
      setMessages(response.data.messages || []); // Removed redundant `await`
    } catch (error) {
      console.error('Error fetching chat history:', error);
      alert('Failed to load chat history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewChatRoom = async () => {
    try {
      const response = await axiosInstance.post('/chatbot/create/chatroom', {
        user_name: userName || 'bhoomi',
        title: 'Chat Room Title',
      });
      setChatRoomId(response?.data?.chat_room_id);
      console.log('Updated chat room ID:', response?.data?.chat_room_id); // Log new value
    } catch (error) {
      console.error('Error creating new chat room:', error);
      alert('Failed to create a new chat room. Please try again.');
    }
  };

  // const getUserProfile = async () => {
  //   try {
  //     const response = await axiosInstance.get('/user/profile');
  //     console.log('User profile:', response.data);
  //     setUserName(response.data.user_name); // Fixed setter name
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error);
  //     alert('Failed to fetch user profile. Please try again.');
  //   }
  // };

  const getData = async () => {
    try {
      // await getUserProfile();
      await createNewChatRoom();
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');

    try {
      setIsSending(true);
      const response = await axiosInstance.post(`/chatbot/add_message/${chatRoomId}`, {
        sender: 'user',
        message: messageToSend,
      });
      if (response.status === 200) {
        await fetchChatHistory();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
      setInputMessage(messageToSend);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-xl mb-4 flex flex-col w-80 sm:w-96 h-96 overflow-hidden"
          >
            <div className="bg-rose-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Chat Support</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {isLoading && messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="animate-spin text-rose-600" size={24} />
                  <span className="ml-2 text-gray-600">Loading chat history...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-3/4 ${
                        msg.sender === 'user'
                          ? 'ml-auto bg-rose-500 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg'
                          : 'mr-auto bg-gray-200 text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg'
                      } p-3 break-words`}
                    >
                      <p className="whitespace-pre-line">{msg.message}</p>
                      <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="border-t p-3 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading || isSending}
              />
              <button
                type="submit"
                className="ml-2 bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
                disabled={isLoading || isSending || !inputMessage.trim()}
              >
                {isSending ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="bg-rose-600 text-white p-4 rounded-full shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default ChatbotInterface;