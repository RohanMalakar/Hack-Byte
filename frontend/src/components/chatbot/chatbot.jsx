import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, Sparkles } from 'lucide-react';
import axiosInstance from '../../helper/axiosinstance';

const ChatbotInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRoomId = '3e61aa02-6f3d-4971-a49f-ff2d1d5bf09b';
  const apiUrl = `/chatbot/${chatRoomId}`;
  
  const fetchChatHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(apiUrl);
      console.log('Chat history response:', response.data);
      const data = await response.data;
      setMessages(data.messages || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
      // Focus the input field when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    
    // Optimistically add message to UI
    const tempMessage = {
      _id: `temp-${Date.now()}`,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, tempMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');
    
    try {
      setIsSending(true);
      const response = await axiosInstance.post(`${apiUrl}/add_message`, {
        sender: 'user',
        message: messageToSend
      });
      console.log(response);
      if (response.status === 200) {
        // Add server response message
        const botMessage = {
          _id: `bot-${Date.now()}`,
          sender: 'bot',
          message: 'Thank you for your message! Our team will get back to you shortly.',
          timestamp: new Date().toISOString()
        };
        
        // Add a slight delay before showing bot response
        setTimeout(() => {
          setMessages(prev => [...prev, botMessage]);
        }, 500);
        
      } else {
        console.error('Failed to send message');
        // Revert optimistic update on failure
        setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
        setInputMessage(messageToSend);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Revert optimistic update on error
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
      setInputMessage(messageToSend);
      alert('Error sending message. Please check your connection.');
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

  // Message animations
  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 100, transition: { duration: 0.2 } }
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
            className="rounded-2xl shadow-2xl mb-4 flex flex-col w-80 sm:w-96 h-96 overflow-hidden"
            style={{ boxShadow: '0 10px 25px -5px rgba(249, 168, 212, 0.5)' }}
          >
            {/* Chat header */}
            <motion.div 
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-4 flex justify-between items-center"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={20} className="text-rose-200" />
                <h3 className="font-medium">Chat Support</h3>
              </motion.div>
              <motion.button 
                onClick={toggleChat} 
                className="text-white hover:text-rose-200 transition-colors duration-300"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
            
            {/* Chat messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-rose-50 to-rose-50 relative">
              {isLoading && messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="text-rose-600" size={30} />
                  </motion.div>
                  <motion.span 
                    className="text-rose-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Loading chat history...
                  </motion.span>
                </div>
              ) : (
                <div className="space-y-4 relative z-10">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg._id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={messageVariants}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`max-w-3/4 ${
                          msg.sender === 'user' 
                            ? 'ml-auto bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
                            : 'mr-auto bg-white text-gray-800 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl'
                        } p-3 break-words shadow-md hover:shadow-lg transition-shadow duration-300`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="whitespace-pre-line">{msg.message}</p>
                        <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-rose-100' : 'text-gray-500'}`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Input form */}
            <motion.form 
              onSubmit={sendMessage} 
              className="border-t border-rose-100 p-3 flex items-center bg-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-rose-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-300"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading || isSending}
              />
              <motion.button 
                type="submit" 
                className="ml-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white p-2 rounded-full hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 transition-all duration-300"
                disabled={isLoading || isSending || !inputMessage.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isSending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={18} />
                  </motion.div>
                ) : (
                  <Send size={18} />
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat toggle button with pulse effect */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-rose-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="bg-gradient-to-r from-rose-500 to-rose-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl relative z-10 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-300"
          style={{ boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}
        >
          <MessageCircle size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatbotInterface;