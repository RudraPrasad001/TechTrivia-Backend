import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRouter from "../src/routes/admin.route.js"
import authRouter from "../src/routes/auth.route.js"
import userRouter from "../src/routes/user.route.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin:process.env.HOST_URL,
    credentials:true
}));

app.use("/api/auth",authRouter);
app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);


app.listen(3000, async ()=>{
    try {
    await connectDB();
    console.log(`Server is listening on port 3000`);
  } catch (error) {
    console.log("Failed to connect to DB",error);
    process.exit(1);
  }
})
