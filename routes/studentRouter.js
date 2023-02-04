import express from "express";
import { addStudent } from "../controllers/studentController.js";
 

const studentRouter = express.Router();
studentRouter.post("/schools/:school_id/addStudent", addStudent);

export default studentRouter;