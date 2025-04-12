import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import likeRouter from "./routes/like.route.js";
import ngoRouter from './routes/ngo.route.js';
import chatbotRouter from "./routes/chatbot.route.js";
import tagRouter from "./routes/tag.route.js";
import contactUsRouter from "./routes/contactUs.route.js";
import blogRouter from "./routes/blog.route.js";
import morgan from 'morgan';

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/like",likeRouter);
app.use("/api/v1/ngo",ngoRouter);
app.use("/api/v1/post",postRouter);
app.use("/api/v1/chatbot",chatbotRouter);
app.use("/api/v1/tag",tagRouter);
app.use("/api/v1/contactUs",contactUsRouter);
app.use("/api/v1/blog",blogRouter);


app.use("/api/v1/check", async (req, res) => {
  console.log("working");
  res.send("working");
});


export { app };
