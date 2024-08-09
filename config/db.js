import mongoose from 'mongoose';
import config from './config.js';

// const connectDB = async () => {
//   mongoose.set('strictQuery', false);
//   try {
//     const mongoUri = encodeURI(config.mongoUri);
//     const conection = await mongoose.connect(mongoUri);
//     const url = `${conection.connection.host}:${conection.connection.port}`;
//     console.log(`MongoDB conectado en: ${url}`);
//   } catch (error) {
//     console.error(`error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

// const conectDB = async () => { mongoose.connect(config.mongoUri)
//     .then(() => {
//         console.log('MongoDB connected...')
//     })
//     .catch((err) => console.log(err));
//     }

const conectDB = async () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.mongoUri)
        .then(() => {
          console.log('MongoDB connected...')
          resolve();
        })
        .catch((err) => {
          console.log('Failed to connect to the database:', err);
          reject(err);
        });
    });
  };

export default conectDB