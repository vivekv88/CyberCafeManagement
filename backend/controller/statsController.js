import computerModel from "../models/computer-model.js";
import userModel from '../models/user-model.js'

const stats = async (req,res) => {
    try {
        const computerCount = await computerModel.countDocuments();
        const userCount = await userModel.countDocuments();
        const vacantComputers = await computerModel.countDocuments({ inUse : false });
        res.json({computers: computerCount, users: userCount, vacant:vacantComputers});
    } catch (error) {
        console.error({message:"Cannot Count the Data"},error);
    }
}

export { stats };