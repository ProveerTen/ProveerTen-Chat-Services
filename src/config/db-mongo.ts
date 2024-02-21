import mongoose from 'mongoose';

export function connectionMongoDb() {
    mongoose.connect(process.env.DB_CONNECTION!)
        .then(connection => {
            console.log(`connection established in database "${connection.connections[0].name}"`);
        })
        .catch(error => {
            console.log(error);
        })
}












