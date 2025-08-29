import computerModel from "../models/computer-model.js";

const addComputer = async (req,res) => {
    try {
        const { systemName, systemLocation } = req.body;

        const computer = new computerModel({
            systemName:systemName,
            systemLocation:systemLocation
        })

        await computer.save();
        res.status(200).json(computer);
    } catch (error) {
        console.log(error);
    }
}


export { addComputer };