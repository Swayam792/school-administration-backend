import express from "express";
import { addTeacher, allTeacher, SubjectDetails, teacherDetails, teacherPaymentDetails, updateTeacherSalaryStatus } from "../controllers/teacherController.js";
  
const teacherRouter = express.Router();
teacherRouter.get("/schools/:school_id/allteacher", allTeacher);
teacherRouter.get("/teacher/:teacher_id", teacherDetails);
teacherRouter.get("/teacher/:teacher_id/paymentdetails", teacherPaymentDetails);
teacherRouter.post("/teacher/:teacher_id/updatepayment", updateTeacherSalaryStatus);
teacherRouter.post("/schools/:school_id/addtecher", addTeacher);
teacherRouter.get("/school/:school_id/allSubject", SubjectDetails);

export default teacherRouter;