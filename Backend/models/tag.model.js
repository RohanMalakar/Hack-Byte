import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  post_id: { 
    type: mongoose.Schema.Types.String, 
    ref: "Post", required: true
  },
  ngo_id: { 
    type: mongoose.Schema.Types.String, 
    ref: "NGO", required: true
  }
});

export default mongoose.model("Tag", tagSchema);
