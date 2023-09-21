import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from './routes/authRouter';
import categoryRouter from './routes/categoryRouter';
import productRouter from './routes/productRouter';
import uploadRouter from './routes/uploadRouter';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

// Configure middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Define routes
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use(uploadRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log('SUCCESSFULLY CONNECTED');
});
