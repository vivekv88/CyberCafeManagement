import mongoose from'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vivekraj2955:cybercafe8874@cluster0.gnxqp2l.mongodb.net/?').then(console.log("Database Connected Succesfully"))
}