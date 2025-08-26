import express from 'express'
import { addUser, endTime, getUser, removeUser, startTime } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/add',addUser)
userRouter.get('/users',getUser)
userRouter.delete('/remove/:id',removeUser)
userRouter.post('/startTime/:id',startTime)
userRouter.post('/endTime/:id',endTime)

export default userRouter;