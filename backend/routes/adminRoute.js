import express from 'express'
import { loginAdmin, registerAdmin } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/register',registerAdmin);
adminRouter.post('/adminlogin',loginAdmin);

export default adminRouter;
