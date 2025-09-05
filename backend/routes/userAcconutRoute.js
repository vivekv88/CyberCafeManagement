import express from 'express'
import { loginUser, registerUser } from '../controller/userAccountController.js';

const userAccountRouter = express.Router();

userAccountRouter.post('/registerNewUser',registerUser);
userAccountRouter.post('/loginUser',loginUser);

export default userAccountRouter;