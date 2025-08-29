import mongoose from 'mongoose'

const computerSchema = new mongoose.Schema({
    systemName:{type:String,required:true,unique:true},
    systemLocation:{type:Number,required:true,unique:true},
    inUse:{type:Boolean,default:false}
})

const computerModel = mongoose.models.computer || mongoose.model('computer',computerSchema);

export default computerModel;