import { Server as SocketIOServer, Socket } from 'socket.io';

export default function socketController(io: SocketIOServer) {

    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        socket.on('join', (userId: string, roomId: string) => {
            console.log('User joined:', userId, "to room", roomId);
            socket.join(roomId);
        });

        socket.on('message', async (message: any, roomId: string) => {
            console.log('Message received:', message);
            io.to(roomId).emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

    });

}