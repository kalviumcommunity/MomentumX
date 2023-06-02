const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URL = process.env.VITE_MONGODB_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB connected: ${MONGODB_URL}`)

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit()
    }
}

module.exports = connectDB