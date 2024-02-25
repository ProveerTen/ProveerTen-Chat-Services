// import { Schema, model, Document } from "mongoose";

// const messageSchema = new Schema({
//   sender: {type: String, required: true},
//   content: String,
//   timestamp: { type: Date, default: Date.now}
// });

// const chatSchema = new Schema({
//   _id: String,
//   participants: [String],
//   messages: [messageSchema]
// });

// export interface chatI  extends Document{

//     _id:string,
//     participants :[string],
//     messages : object

// }

// export default model<chatI>('Chat', chatSchema);

import { Schema, model, Document } from "mongoose";

interface IMessage extends Document {
    sender: string;
    content?: string;
    timestamp?: Date;
}

const messageSchema = new Schema<IMessage>({
    sender: { type: String, required: true },
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const chatSchema = new Schema({
    _id: String,
    participants: Object,
    messages: [messageSchema]
});

interface IChat extends Document {
    _id: string;
    participants: string[];
    messages: IMessage[];
}

export default model<IChat>('Chat', chatSchema);
