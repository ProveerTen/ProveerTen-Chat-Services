import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server as SocketIOServer ,Socket } from 'socket.io' 
import provider from './routes/provider';
import chat from './routes/chat'

class Server {

    private app: express.Application;
    private port: string;
    private port_chat: string;
    private httpServer: http.Server;
    private io: SocketIOServer;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.port_chat = process.env.PORT_CHAT || '10000';
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: { origin: 'http://localhost:4200' }
        });
        this.middlewares();
        this.routes();
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server chat running on port ${this.port_chat}`);
        });
        
        this.app.listen(this.port_chat, () => {
            console.log(`Server running on port ${this.port}`);
        }); 
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/route', (req, res) => {
            res.send('Hello World!');
        });

        this.app.use('/provider', provider);
        this.app.use ('/chat', chat)
    }
}
export default Server