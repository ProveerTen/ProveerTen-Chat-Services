import Server from './server';
import dotenv from 'dotenv'
import { connectionMongoDb } from './config/db-mongo';
import pool from './config/db-mysql';


dotenv.config();

const server = new Server();

server.listen();

pool.getConnection;
connectionMongoDb();