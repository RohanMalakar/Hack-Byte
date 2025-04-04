import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  post_id: { 
    type: mongoose.Schema.Types.String, 
    ref: "Post", 
    required: true 
  },
  user_name: { 
    type: String, 
    required: true 
  }
},{
  timestamps: true,
});

export default mongoose.model("Like", likeSchema);
