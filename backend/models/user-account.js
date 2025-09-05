import mongoose from 'mongoose'

const userAccountSchema  = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true},
    paymentStatus:{type:String,enum:["unpaid","paid"],default:"unpaid"}
})

const userAccount = mongoose.models.userAccount || mongoose.model("userAccount",userAccountSchema)

export default userAccount;