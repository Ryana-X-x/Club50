import { Server } from "socket.io";
import http from 'http';
import express from 'express'
import cors from 'cors'
const app=express();

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
})



export const getReceiverSocketId=(recieverId)=>{
    return userSocketMap[recieverId]
}

const userSocketMap={};//{userId:socketid}

io.on('connection',(socket)=>{
    console.log("A user connected ",socket.id)

    const userId=socket.handshake.query.userId;
    if(userId != "undefined"){
        userSocketMap[userId]=socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log("User Disconnected ",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export{app,io,server}