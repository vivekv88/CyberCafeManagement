import adminModel from '../models/admin-model.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginAdmin = async (req,res) => {
    const {email,password} = req.body;
    
    try {
        
        const user = await adminModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid email or password"});
        }

        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        
    }
}

const registerAdmin = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const userexists = await adminModel.findOne({ email });

        if (userexists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let admin = new adminModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const newAdmin = await admin.save();
        const token = createToken(newAdmin._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Some error Occurred"})
    }
}

export { loginAdmin, registerAdmin }