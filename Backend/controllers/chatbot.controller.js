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
      { input: "hello", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "hi", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "hey", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "helo", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "hi there", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "good morning", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },
  { input: "good evening", output: "Hello! Welcome to Sahayak. I am your assistant. How can I help you today?" },

  // ABOUT SAHAYAK
  { input: "what is sahayak", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },
  { input: "tell me about sahayak", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },
  { input: "whats sahayak", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },
  { input: "sahayk info", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },
  { input: "explain sahayak", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },
  { input: "platform overview", output: "Sahayak is a platform designed to connect users who need help with NGOs ready to offer support. You can post issues, read blogs, access helplines, and more." },

  // USING PLATFORM
  { input: "how can i use sahayak", output: "You can create posts, browse blogs, access helplines, and connect with NGOs through Sahayak." },
  { input: "how do i use this platform", output: "You can create posts, browse blogs, access helplines, and connect with NGOs through Sahayak." },
  { input: "how to use sahayak", output: "You can create posts, browse blogs, access helplines, and connect with NGOs through Sahayak." },
  { input: "what can i do here", output: "You can create posts, get help from NGOs, read useful blogs, and explore helplines on Sahayak." },
  { input: "what features are available", output: "You can create posts, get help from NGOs, read useful blogs, and explore helplines on Sahayak." },
  { input: "what are the main services", output: "You can create posts, get help from NGOs, read useful blogs, and explore helplines on Sahayak." },
  { input: "is it free to use", output: "Yes, Sahayak is completely free for users." },
  { input: "does it cost anything", output: "No, using Sahayak is free." },
  { input: "do i have to pay", output: "No, using Sahayak is free." },

  // ANONYMOUS POSTING
  { input: "can i stay anonymous", output: "Yes, you can create posts anonymously. You must verify your account first, but your identity will not be shown publicly." },
  { input: "can i post without showing my name", output: "Yes, you can post anonymously after verification. Your identity stays hidden." },
  { input: "is posting anonymous", output: "Yes, you can post anonymously after verification. Your identity stays hidden." },
  { input: "do i need to show my name", output: "No, your name will not be displayed publicly if you choose to post anonymously." },
  { input: "how do you protect identity", output: "We verify your identity privately, but your details are never shared publicly if you choose anonymity." },

  // PROBLEM SOLVING / NGO TRACKING
  { input: "how do you make sure ngos solve problems", output: "We monitor posts and their statuses. If an issue stays unsolved for over a month, we contact the NGO directly and inform you about the situation." },
  { input: "how you track ngos", output: "We track post statuses. If an issue remains unresolved, we reach out to the NGO and update you." },
  { input: "what if my issue is not solved", output: "If your issue remains unsolved for more than a month, we will intervene and update you about the progress." },
  { input: "will you follow up on my issue", output: "Yes, we track every post and follow up if necessary to make sure you get the help you need." },
  { input: "what happens if no ngo responds", output: "We will personally reach out to the NGOs to find out the cause and keep you informed." },

  // UNIQUENESS / TRUST
  { input: "what makes sahayak different", output: "Our commitment to transparency and building trust makes us unique. We stay with you until your problem is resolved." },
  { input: "why should i use sahayak", output: "Because we are transparent, committed to your journey, and make sure your problem doesn't get ignored." },
  { input: "what is unique about sahayak", output: "Transparency, trust, and continuous support until a conclusion is reached make Sahayak special." },
  { input: "do ngos get credit", output: "Yes, NGOs and organizations that help solve issues will get proper credit and appreciation." },
  { input: "will you credit ngos", output: "Absolutely! NGOs that solve problems will receive proper recognition." },

  // GENERAL FAQs
  { input: "is my data safe", output: "Yes, we take your privacy and data security very seriously." },
  { input: "how do you protect user data", output: "We use best practices to keep your information safe and private." },
  { input: "can i delete my account", output: "Yes, you can delete your account anytime by contacting support." },
  { input: "how can i contact support", output: "You can reach out to our support team through the 'Contact Us' page on the platform." },
  { input: "how can ngos join", output: "NGOs can register through the NGO Registration Portal on our website and start helping users." },
  { input: "how do organizations register", output: "Organizations can register via our dedicated NGO registration page." },
  { input: "is sahayak open to all ngos", output: "Yes, any verified NGO focused on social good can join Sahayak." },
  { input: "can individuals also help", output: "Currently, only registered NGOs can respond to posts. But individuals can still share resources or volunteer through NGOs." },

  // IF UNKNOWN QUESTION
  { input: "default", output: "Sorry, I don't have information regarding that. I will inform my superiors, and they will reach out to you shortly." },
  { input: "how to use sahayak", output: "You can explore posts, create your own post, read blogs, and access helplines. Simply sign up and get started!" },
  { input: "what can i do here", output: "You can create posts, read posts, access blogs, find helplines, and connect with NGOs for help." },
  { input: "how can sahayak help me", output: "Sahayak connects you with NGOs who are willing to help you based on your needs." },
  { input: "is sahayak free", output: "Yes! Sahayak is completely free to use for users and NGOs." },
  { input: "can i read posts", output: "Yes, you can browse public posts created by users and NGOs." },
  { input: "how to create a post", output: "Go to the 'Create Post' section, fill in your details or stay anonymous, and submit it for NGOs to see." },
  { input: "can i post without account", output: "No, you must create and verify an account to create a post. But you can choose to stay anonymous publicly." },
  { input: "what are blogs in sahayak", output: "Blogs are informative articles you can read about rights, opportunities, NGOs, and helpful tips." },
  { input: "where to find helplines", output: "You can find helplines listed under the 'Helpline' section in Sahayak's menu." },
  { input: "can i delete my post", output: "Yes, you can manage and delete your post from your dashboard anytime." },

  // NGOs AND ORGANIZATIONS
  { input: "how do ngos help", output: "NGOs can view posts and offer support or resources based on the user's needs." },
  { input: "how can ngos join", output: "NGOs can register on Sahayak, verify their identity, and start helping users directly through posts." },
  { input: "do ngos get credit", output: "Yes, NGOs and organizations that solve issues will receive public credit and appreciation!" },
  { input: "how sahayak track ngos", output: "We track post statuses. If a post remains unresolved for over a month, we follow up with the NGO directly." },
  { input: "what if ngos ignore", output: "If an NGO ignores a problem, Sahayak will step in to contact them and inform the user transparently." },
  { input: "can ngos post too", output: "Yes, verified NGOs can also post updates, opportunities, and calls for help!" },

  // ANONYMITY
  { input: "can i stay anonymous", output: "Yes, you can post anonymously after verifying your account. Your identity won’t be shown publicly." },
  { input: "is my data safe", output: "Absolutely! Your data is safe with us. We do not share your personal information without consent." },
  { input: "how do you verify users", output: "Users are verified via basic identity checks, but public posts can stay anonymous." },
  { input: "what if i want to hide identity", output: "Simply choose the 'Post Anonymously' option when creating your post. Your identity will not be revealed." },

  // TRANSPARENCY AND TRUST
  { input: "how sahayak builds trust", output: "We ensure transparency by tracking every post, following up with NGOs, and keeping users updated." },
  { input: "how do you ensure posts are solved", output: "We monitor post statuses. If unresolved for too long, we intervene and update the user." },
  { input: "what makes sahayak different", output: "Our mission is not just to post and forget. We stay in touch with users till we reach a conclusion." },
  { input: "what is unique about sahayak", output: "Transparency, trust, and dedication to solving every problem till the end makes us unique!" },
  { input: "is sahayak safe", output: "Yes, we ensure safety, privacy, and transparency for every user and NGO on the platform." },

  // GENERAL SUPPORT
  { input: "i have a doubt", output: "Feel free to ask! I'm here to help you understand everything about Sahayak." },
  { input: "who are you", output: "I am your Sahayak Assistant. I'm here to guide you through the platform and help you connect with NGOs." },
  { input: "how to contact sahayak team", output: "You can use the 'Contact Us' section to reach our support team directly." },
  { input: "need help with post", output: "Sure! Let me guide you. Go to 'Create Post', fill in details, and submit. If stuck, contact support!" },
  { input: "problem not solved", output: "Don't worry. We will follow up with the NGO and keep you informed about the status." },

  // RANDOM USER BEHAVIOR
  { input: "can i volunteer", output: "Yes! We love volunteers. Please reach out through the 'Volunteer with us' option." },
  { input: "can i donate", output: "Yes, some NGOs on Sahayak accept donations. We will guide you safely to trusted channels." },
  { input: "is sahayak government site", output: "No, Sahayak is an independent platform aimed at connecting help seekers and NGOs transparently." },
  { input: "what if i post fake issue", output: "Fake posts are strictly against our guidelines. Verified posts maintain the integrity of the platform." },
  { input: "can ngos see my contact info", output: "No, unless you choose to share it yourself in the post or during communication." },

  // EDGE CASES
  { input: "can i ask questions", output: "Yes, feel free to ask any questions. I'm here to assist you." },
  { input: "what happens after i post", output: "NGOs will view your post and reach out if they can help. We'll track progress too." },
  { input: "how many posts can i create", output: "You can create multiple posts if you have different issues needing help!" },
  { input: "what if no one responds", output: "If no one responds, we will actively follow up and help find an alternative solution." },
  { input: "what languages sahayak support", output: "Currently, Sahayak primarily supports English, but multi-language support is coming soon!" },
  { input: "where is sahayak available", output: "Sahayak is accessible online from anywhere, but currently focused mainly on Indian NGOs and users." },
  { input: "can i edit my post later", output: "Yes, you can edit your post from your dashboard after posting." },
  { input: "who can see my post", output: "Your post will be visible to verified NGOs and optionally to the public if you choose." },
  { input: "what is post status", output: "Post status shows if your problem is 'Open', 'In Progress', or 'Solved'." },
  { input: "what is verified user", output: "Verified users have passed basic identity verification to keep Sahayak safe and genuine." },
  { input: "what is sahayak", output: "Sahayak is a platform built to bridge the gap between NGOs and people who need help. We make it easy for users to connect with organizations and get support." },
  { input: "tell me about sahayak", output: "Sahayak is a centralized platform where users can post problems, access helplines, read blogs, and get connected to NGOs ready to help." },
  { input: "who created sahayak", output: "Sahayak was created with the vision of making help accessible, trustworthy, and transparent for everyone in need." },
  { input: "what can i do here", output: "You can create posts about any issues you're facing, browse existing posts, read blogs, and reach out to helplines." },
  { input: "what all can be done on sahayak", output: "You can read blogs, create posts, stay anonymous while posting, access helplines, and connect directly to NGOs for support." },

  // ISSUES YOU CAN POST ABOUT
  { input: "what type of issues can i post about", output: "You can post about social issues, personal hardships, health support, education help, financial needs, legal aid, or any other genuine concerns." },
  { input: "can i post about financial help", output: "Yes, you can post if you need financial help. NGOs will review and respond to your post accordingly." },
  { input: "can i post if i need education support", output: "Absolutely! If you need help with education, fees, or resources, you can create a post about it." },
  { input: "can i post about legal issues", output: "Yes, you can post about legal aid requirements. NGOs with legal support services can connect with you." },
  { input: "is there any restriction on what i can post", output: "You can post about any genuine issue needing support, but posts that violate community guidelines or involve illegal activities won't be allowed." },

  // MORE PLATFORM DETAILS
  { input: "is sahayak for everyone", output: "Yes, Sahayak is open for anyone who genuinely needs help or wants to contribute through NGOs." },
  { input: "can i stay anonymous while posting", output: "Yes, you can choose to post anonymously. Your identity will not be shown publicly but will be verified internally." },
  { input: "how do you verify posts", output: "We verify posts internally to make sure they are genuine before making them public or sending them to NGOs." },
  { input: "how do ngos respond", output: "NGOs see your post, evaluate it, and reach out to you either through Sahayak or their contact channels." },
  { input: "what happens if no ngo responds", output: "If a post remains unsolved for over a month, we personally reach out to the NGO and update you with the reason or next steps." },

  // TRUST AND TRANSPARENCY
  { input: "what makes sahayak different", output: "Our focus is on building trust and transparency. We stay with the user until their problem is solved, unlike other platforms." },
  { input: "how do you ensure transparency", output: "We track the progress of every post and regularly follow up with NGOs and users to ensure clarity and honesty." },
  { input: "do ngos get credit", output: "Yes, NGOs that solve user issues get full public credit and visibility for their contribution." },
  { input: "will sahayak support me until the end", output: "Yes, we stay in touch until your issue is either solved or a clear update is provided. You're never left alone." },

  // HELPLINE AND BLOGS
  { input: "what are helplines for", output: "Helplines are direct emergency contact numbers or support services you can reach out to anytime." },
  { input: "what are the blogs about", output: "Our blogs educate you about your rights, how NGOs work, success stories, tips for seeking help, and much more." },
  { input: "can i suggest a helpline", output: "Yes! If you know a verified helpline that can help users, you can suggest it to our team for review." },
  { input: "can i write a blog", output: "Currently, blogs are managed by our editorial team. But you can suggest topics or share stories which we might feature!" }


          
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