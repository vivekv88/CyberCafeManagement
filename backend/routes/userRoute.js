import express from 'express'
import { addUser, getUser, removeUser } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/add',addUser)
userRouter.get('/users',getUser)
userRouter.delete('/remove/:id',removeUser)

export default userRouter;