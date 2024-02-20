import Server from './server';
import dotenv from 'dotenv'
import { connectionMongoDb } from './config/db-mongo';


dotenv.config();

const server = new Server();

server.listen();

connectionMongoDb();