import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ngoSchema = new mongoose.Schema({
  ngo_id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: {
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true,
    select: false
  },
  website: { 
    type: String 
  },
  logo_url: { 
    type: String 
  },
  is_verified: { 
    type: String, 
    enum: ["not_verified", "under_verification", "verified"], 
    default: "not_verified" 
  }
},{
  timestamps: true
});

ngoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password =await bcrypt.hash(this.password, 10);
  next();
});
ngoSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
ngoSchema.methods.generateAccessToken=async function () {
   try {
     const token=await jwt.sign({ 
       id: this._id,
       email: this.email,
       ngo_id: this.ngo_id,
       name: this.name,
      }, 
       process.env.ACCESS_TOKEN_SECRET, 
       {
         expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
     });
     return token;
    
   } catch (error) {
     console.log(error.message);
   }
   
};


export default mongoose.model("NGO", ngoSchema);
