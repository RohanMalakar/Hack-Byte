import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  user_name: { 
    type: String,  
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  location: {
    latitude: { 
      type: Number 
    },
    longitude: { 
      type: Number
    },
    address: { 
      type: String
     }
  },
  anonymous: { 
    type: Boolean, 
    default: false 
  },
  status: {
    type: String,
    enum: ["unsolved", "solved", "inconsideration"],
    default: "unsolved",
  },
  under_ngo: { 
    type: mongoose.Schema.Types.String, 
    ref: "NGO" 
  },
  media: [
    {
      type: String
    }
  ],
  tag: [
    {
      type: String
    }
  ]
},{
  timestamps: true,
});

const Post=mongoose.model("Post", postSchema);

export default Post;