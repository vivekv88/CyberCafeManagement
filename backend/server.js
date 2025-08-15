import express from 'express'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
const app = express();

app.use(express.json());
app.use("/api",userRouter)
app.use("/api",adminRouter)
app.use("/api",adminRouter)

connectDB();

app.get("/",(req,res) => {
    res.send("I am in the game")
})

app.listen(3000);