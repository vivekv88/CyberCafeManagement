import mongoose from'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vivekraj2955:cybercafe8874@cluster0.gnxqp2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log("Database Connected Succesfully"))
}