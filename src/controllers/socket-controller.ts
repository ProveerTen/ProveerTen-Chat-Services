import { Server as SocketIOServer, Socket } from 'socket.io';
import { classify_text } from '../helpers/ia-validate-message';
import models from "../models/chat";

export default function socketController(io: SocketIOServer) {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');
    let socketId = socket.id
    socket.on('join', (userId: string, roomId: string) => {
      console.log('User joined:', userId, "to room", roomId);
      socket.join(roomId);
    });

    socket.on('message', async (message: any, roomId: string) => {

      console.log('Message received:', message);

      let validateMessage = await classify_text(message.content);
      console.log(validateMessage);

      if (validateMessage === 'SI') {
        message.content = "Este mensaje no cumple las politicas establecidas"
        io.to(socketId).emit(`message:${roomId}`, message);
      } else {
        const chat = await models.Chat.findById(roomId);
        if (chat) {
          const newMessage = new models.Message({
            sender: message.sender,
            content: message.content,
            timestamp: new Date()
          });
          chat.messages.push(newMessage);
          await chat.save();
          io.to(roomId).emit(`message:${roomId}`, newMessage);
        } else {
          console.log("No se encontró la sala de chat con ID:", roomId);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

  });

}
