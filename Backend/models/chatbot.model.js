import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  chatRoomId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Chatbot', chatSchema);
