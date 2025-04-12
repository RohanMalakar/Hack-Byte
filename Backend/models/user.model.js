import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  user_name: { 
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
  mobile_number: { 
    type: String 
  },
  password: { 
    type: String, 
    select: false,
    required: function () {
      return this.auth_type === "local";
    }  
  },
  google_id: { 
    type: String ,
    required: function () {
      return this.auth_type === "google";
    }
  },
  user_profile: { 
    type: String 
  },
  is_verified: { 
    type: Boolean, 
    default: false 
  },
  is_blocked: { 
    type: Boolean, 
    default: false 
  },
  auth_type: { 
    type: String, 
    enum: ["local", "google"], 
    default: "local" 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
},{
  timestamps: true
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password =await bcrypt.hash(this.password, 10);
//   next();
// });
userSchema.methods.comparePassword = async function (enteredPassword) {
  // return await bcrypt.compare(enteredPassword, this.password);
  return this.password === enteredPassword;
};
userSchema.methods.generateAccessToken=async function () {
   try {
     const token=await jwt.sign({ 
       id: this._id,
       email: this.email,
       user_name: this.user_name,
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

const User = mongoose.model("User", userSchema);
export default User;

