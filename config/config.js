import dotenv from 'dotenv'
dotenv.config()

const config = {
    // env: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI_ATLAS,
    // jwtSecret: process.env.JWT_SECRET
  };
  
  export default config; 