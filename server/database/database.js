import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async () => {

    const MONGODB_URI = `${process.env.MONGO_DATABASE_URI}`;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Database connection successfully')
    } catch (error) {
        console.error('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;