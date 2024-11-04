import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path'

import { fileURLToPath } from 'url';






import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
// import userRoutes from './routes/userRoutes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();


const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
// app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, "frontend", "dist")));

// app.use('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
// })


server.listen(PORT,"0.0.0.0",() => {
    connectToMongoDB();
    console.log(`listening on http://localhost:${PORT}`);
})