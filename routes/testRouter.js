import express from "express";
import { addSubject, addTest, getTestSubject, schoolAllTest, uploadMarks } from "../controllers/testController.js";

const testRouter = express.Router();
 
testRouter.post("/students/:student_id/tests/:test_id/uploadmarks", uploadMarks);
testRouter.get("/schools/:school_id/tests", schoolAllTest);
testRouter.post("/schools/:school_id/addsubject", addSubject);
testRouter.post("/schools/:school_id/tests", addTest);
testRouter.get("/student/:student_id/getSubjects", getTestSubject);

export default testRouter;