import express from 'express'
import { addUser, getUser } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/add',addUser)
userRouter.get('/users',getUser)

export default userRouter;