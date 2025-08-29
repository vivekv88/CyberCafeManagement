import express from 'express'
import { addComputer, getComputers, toggleController } from '../controller/computerController.js';

const computerRouter = express.Router();

computerRouter.post('/addComputer',addComputer);
computerRouter.get('/computers',getComputers);
computerRouter.patch('/computers/:id/toggle',toggleController);

export default computerRouter;