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

interface IChat extends Document {
    _id: string;
    participants: string[];
    messages: IMessage[];
}

const chatSchema = new Schema({
    _id: String,
    participants: Object,
    messages: [messageSchema]
});

export default {
    Chat : model<IChat>('Chat', chatSchema),
    Message : model<IMessage>('Message', messageSchema)
};
