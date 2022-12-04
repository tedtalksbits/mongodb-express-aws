import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/auth/auth.js';
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/v1', authRoutes);

// connect to db
connectDB();

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
