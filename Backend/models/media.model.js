import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mediaSchema = new mongoose.Schema({
  link: { 
    type: String, 
    required: true 
  },
  post_id: { 
    type: mongoose.Schema.Types.String, 
    ref: "Post", required: true 
  },
  type: { 
    type: String, 
    enum: ["img", "vid"], 
    required: true 
  },
  order: { 
    type: Number 
  }
},{
  timestamps: true
});

export default mongoose.model("Media", mediaSchema);
