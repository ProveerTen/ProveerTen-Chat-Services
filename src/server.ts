import cors from 'cors';
import morgan from 'morgan';
import express from 'express'


class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({ credentials: true, origin: 'https://proveerten-deploy.netlify.app' }));
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/route', );
    }

}

export default Server;