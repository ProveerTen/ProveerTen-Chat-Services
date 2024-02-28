import { Server as SocketIOServer, Socket } from 'socket.io';
import { GoogleGenerativeAI } from "@google/generative-ai";
import models from "../models/chat";

export default function socketController(io: SocketIOServer) {
    const api:any = 'AIzaSyD3X1hc7lKAX0AGelXWwCRf6aWvIFN8BJ8'

    console.log (api)
    
    const genAI = new GoogleGenerativeAI(api);


    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        socket.on('join', (userId: string, roomId: string) => {
            console.log('User joined:', userId, "to room", roomId);
            socket.join(roomId);
        });

        socket.on('message', async (message: any, roomId: string) => {

            console.log('Message received:', message);
            /*
            // const prompt = `En el lenguaje y dialecto colombiano y de la region del caribe colombiano, evalúa la palabra "${message.mensaje}" por su carácter ofensivo o grosero. Responde con "SÍ" si es una grosería o una ofensa, o "NO" si no lo es.`;
            const prompt = `En el lenguaje y dialecto colombiano y de la regiones de Colombia "${message.mensaje}" por su carácter ofensivo o grosero. Responde con "SÍ" si es una grosería o una ofensa, o "NO" si no lo es.`;
            
            // const prompt = `En el lenguaje colombiano, considera la palabra "${message.mensaje}" utilizada de forma potencialmente ofensiva. ¿Es una grosería o una ofensa? Responde con "SI" o "NO".`
    */
    /*
                try {
                    
                  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                  const result = await model.generateContent(prompt);
                  const response = await result.response;
                  const text = response.text();
                  console.log (text)
                  
                  if (text === "SÍ") {  
                  *
                    message.mensaje = "Este mensaje no cumple las politicas establecidas"
                    io.to(roomId).emit('message', message);
                  } else if (text === "NO") {
                  */
                    const newMessage = new models.Message({
                      sender: message.sender,
                    content: message.content,
                      timestamp: new Date()
                    });
                    const chat = await models.Chat.findById(roomId);
                    if (chat) {
                      chat.messages.push(newMessage);
                      await chat.save();
                      io.to(roomId).emit(`message:${roomId}`, newMessage);
                    } else {
                      console.log("No se encontró la sala de chat con ID:", roomId);
                    }
            /*
                  } else {
                  console.log("No se pudo determinar si hay grocerias en el mensaje");
                }
                } catch (error) {
                  console.error("Error de la IA:", error);
                } */
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

    });

}
