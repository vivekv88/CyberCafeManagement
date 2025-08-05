import express from 'express'
import { connectDB } from './config/db.js';
const app = express();

app.use(express.json());

connectDB();

app.listen(3000);