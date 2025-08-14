import userModel from '../models/user-model.js'

const addUser = async (req,res) => {

    const {name,address,ID,computer,email,mobile} = req.body;

    const user = new userModel({
        name: name,
        address: address,
        ID: ID,
        computer: computer,
        email: email,
        mobile: mobile
    })

    const newUser = new addUser.save();
    console.log(newUser);
    
}

export {addUser};
