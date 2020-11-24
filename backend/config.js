import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/recipes',
    // JWT_SECRET: process.env.JWT_SECRET,
    SERVER_PORT: process.env.PORT || 8001
}