import express from 'express'
import { addComputer } from '../controller/computerController.js';

const computerRouter = express.Router();

computerRouter.post('/addComputer',addComputer);

export default computerRouter;