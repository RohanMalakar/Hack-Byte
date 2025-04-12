import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,  
  },
  description: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  }
},{
  timestamps: true,
});

export default mongoose.model("Blog", blogSchema);
