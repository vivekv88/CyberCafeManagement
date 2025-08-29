import express from 'express'
import { addComputer, getComputers, removeComputer, toggleController } from '../controller/computerController.js';

const computerRouter = express.Router();

computerRouter.post('/addComputer',addComputer);
computerRouter.get('/computers',getComputers);
computerRouter.patch('/computers/:id/toggle',toggleController);
computerRouter.delete('/computers/remove/:id',removeComputer);

export default computerRouter;