import express from "express"; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import connection from "./config/databaseConn.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import superAdminRouter from "./routes/superAdminRouter.js";
import testRouter from "./routes/testRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors());
 
connection.connect((err) => {
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log("Connected to the MySQL server.");
});

app.use("/",authRouter);
app.use("/", adminRouter);
app.use("/", superAdminRouter);
app.use("/", testRouter);
app.use("/", studentRouter);
app.use("/", teacherRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})