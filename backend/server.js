import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import computerRouter from './routes/computerRoute.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api",userRouter)
app.use("/api",userRouter)
app.use("/api",userRouter)
app.use("/api",userRouter)
app.use("/api",userRouter)
app.use("/api",adminRouter)
app.use("/api",adminRouter)
app.use("/api",computerRouter)
app.use("/api",computerRouter)
app.use("/api",computerRouter)
app.use("/api",computerRouter)

connectDB();

app.get("/",(req,res) => {
    res.send("I am in the game")
})

app.listen(3000);