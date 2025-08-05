import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:Object,required:true},
    id:{type:String,required:true},
    computer:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true}
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel;