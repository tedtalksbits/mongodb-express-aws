import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/auth/auth.js';
import accountRoutes from './routes/account/account.js';
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookies middleware
app.use(cookieParser());

app.use('/api/v1', authRoutes);
app.use('/api/v1', accountRoutes);

// serve static page in public folder
app.use(express.static('public'));

// connect to db
connectDB();

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
