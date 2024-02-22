import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server as SocketIOServer ,Socket } from 'socket.io' 


class Server {

    private app: express.Application;
    private port: string;
    private httpServer: http.Server;
    private io: SocketIOServer;

    constructor() {
        this.app = express();
    
        this.port = process.env.PORT || '3000';
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: { origin: 'http://localhost:4200' }
        });
        this.middlewares();
        this.routes();
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server chat running on port ${this.port}`);
        });
        
        this.app.listen(3000, () => {
            console.log(`Server running on port 3000`);
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
    }
}

export default Server;