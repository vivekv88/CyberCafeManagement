import mongoose from'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const password = process.env.DB_PASSWORD;
export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://vivekraj2955:${password}@cluster0.gnxqp2l.mongodb.net/?`).then(console.log("Database Connected Succesfully"))
}