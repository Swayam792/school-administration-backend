import express from "express";

import {allStudent, studentDetails, studentFeesDetails, studentParentDetails, studentPerformance, updateStudentFeeStatus} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/schools/:school_id/allstudent", allStudent);
adminRouter.get("/students/:student_id", studentDetails);
adminRouter.get("/parents/:parents_id", studentParentDetails);
adminRouter.get("/students/:student_id/fees", studentFeesDetails);
adminRouter.get("/students/:student_id/performance", studentPerformance);
adminRouter.put("/students/:student_id/updatepaymentstatus", updateStudentFeeStatus);

export default adminRouter;