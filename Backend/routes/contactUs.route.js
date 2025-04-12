import {createContactUs, getContactUs, deleteContactUs } from "../controllers/contactUs.controller.js";
import { Router } from "express";
const contactUsRouter = Router();

contactUsRouter.post("/create", createContactUs);
contactUsRouter.get("/get", getContactUs);
contactUsRouter.delete("/delete/:id", deleteContactUs);

export default contactUsRouter;