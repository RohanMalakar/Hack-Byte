import ContactUs from "../models/contactUs.model.js";
import mongoose from "mongoose";
const createContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contactUs = new ContactUs({
      name,
      email,
      message,
    });
    await contactUs.save();

    return res.status(200).json({ message: "Contact Us form submitted successfully", data: req.body });
  } catch (error) {
    console.error("Error in createContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Contact Us data fetched successfully", data: contactUs });
  } catch (error) {
    console.error("Error in getContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const deleteContactUs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await ContactUs.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact Us entry deleted successfully" });
  } catch (error) {
    console.error("Error in deleteContactUs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createContactUs, getContactUs, deleteContactUs };