import express from 'express'
import { addComputer, getComputers } from '../controller/computerController.js';

const computerRouter = express.Router();

computerRouter.post('/addComputer',addComputer);
computerRouter.get('/computers',getComputers);

export default computerRouter;