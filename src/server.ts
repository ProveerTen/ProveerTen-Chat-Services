import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import provider from './routes/provider';
import chat from './routes/chat';
import socketController from './controllers/socket-controller';

class Server {
    private app: express.Application;
    private port: string;
    private httpServer: http.Server;
    private io: SocketIOServer;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.httpServer = http.createServer(this.app);
        const allowedOrigins = ['https://proveerten.netlify.app', 'https://proveer-ten-front-end-git-hu-featurechat-bryctans-projects.vercel.app', 'http://localhost:4200'];
        this.io = new SocketIOServer(this.httpServer, {
            cors: { origin: allowedOrigins }
        });
        this.middlewares();
        this.routes();
        socketController(this.io);
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(express.json());
        const allowedOrigins = ['https://proveerten.netlify.app', 'https://proveer-ten-front-end-git-hu-featurechat-bryctans-projects.vercel.app', 'http://localhost:4200'];
        this.app.use(cors({ credentials: true, origin: allowedOrigins }));
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/route', (req, res) => {
            res.send('Hello World!');
        });

        this.app.use('/provider', provider);
        this.app.use('/chat', chat);
    }
}

export default Server;
