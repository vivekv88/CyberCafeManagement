import userModel from '../models/user-model.js'

const addUser = async (req, res) => {

    const { name, address, id, computer, email, mobile } = req.body;

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

const getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users); // send users back to frontend
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

// DELETE a user by ID
const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id); // If MongoDB
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


export { addUser, getUser, removeUser };
