import userModel from '../models/user-model.js'

const addUser = async (req,res) => {

    const {name,address,id,computer,email,mobile} = req.body;

    const user = new userModel({
        name: name,
        address: address,
        id: id,
        computer: computer,
        email: email,
        mobile: mobile
    })

    await user.save();
    console.log(user);
}

export {addUser};
