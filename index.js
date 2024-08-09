import express from 'express'
import config from './config/config.js'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
const PORT = config.PORT
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser())



app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use ('/', userRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Failed to connect to the database:', err);
    }); 

