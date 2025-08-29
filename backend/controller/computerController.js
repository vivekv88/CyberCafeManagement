import computerModel from "../models/computer-model.js";

const addComputer = async (req, res) => {
    try {
        const { systemName, systemLocation } = req.body;

        const computer = new computerModel({
            systemName: systemName,
            systemLocation: systemLocation
        })

        await computer.save();
        res.status(200).json(computer);
    } catch (error) {
        console.log(error);
    }
}

const getComputers = async (req, res) => {
    try {
        const computers = await computerModel.find()
        res.json(computers);
    } catch (error) {
        console.log(error);
    }
}

const toggleController = async (req, res) => {

    try {
        const { id } = req.params;
        const computer = await computerModel.findById(id);

        if (!computer.id) {
            return res.status(404).json({ message: "Computer Not Found" });
        }

        computer.inUse = !computer.inUse;
        await computer.save();
        res.json(computer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Some Error Occurred"});
    }

}


export { addComputer, getComputers, toggleController };