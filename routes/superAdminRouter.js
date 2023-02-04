import express from "express";
import { allSchools, schoolDetails } from "../controllers/superAdminController.js";

const superAdminRouter = express.Router();

superAdminRouter.get("/schools", allSchools);
superAdminRouter.get("/schools/:school_id", schoolDetails);

export default superAdminRouter;