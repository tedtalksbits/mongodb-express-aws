import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
