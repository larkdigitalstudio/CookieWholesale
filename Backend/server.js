import express from 'express';
import {connectDB} from './Config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
// import routes
import AddRoutes from './Routes/Add.js';
import DeleteRoutes from './Routes/Delete.js';
import GetRoutes from './Routes/Get.js';
import EditRoutes from './Routes/Edit.js';
import AuthRoutes from './Routes/Auth.js';

// load environment variables
dotenv.config();

// init express
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect to mongodb
connectDB()

// routes
app.use('/api', AddRoutes);
app.use('/api', DeleteRoutes);
app.use('/api', GetRoutes);
app.use('/api', EditRoutes);
app.use('/api', AuthRoutes);

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});