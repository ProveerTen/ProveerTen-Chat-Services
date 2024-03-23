import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.KEY_CHAT_BOT!);

import { START_CHAT, GENERATION_CONFIG } from '../config/ia-config';


export const gemini_chat = async (req: Request, res: Response) => {

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        //let history = req.body.history;
        let question = req.body.question;
        //let historyChat = START_CHAT.concat(history)
        let historyChat = START_CHAT;
        const chat = model.startChat({
            history: historyChat,
            generationConfig: GENERATION_CONFIG,
        });
        if (await isRelevant(question)) {
            const sendQuestion = await chat.sendMessage(question);
            const response = await sendQuestion.response;
            const text = response.text();
            //history.push({ role: "user", parts: question })
            //history.push({ role: "model", parts: text })
            return res.status(200).json({ text });
        } else {
            return res.status(200).json({ "Message": "no" });
        }


    } catch (error) {
        console.log("La IA NO FUNCIONA");
        console.log(error);
    }
}


const isRelevant = async (question: any): Promise<any> => {
    try {
        
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let historyChat = START_CHAT;

    const chat = model.startChat({
        history: historyChat,
        generationConfig: GENERATION_CONFIG,
    });
    
    const sendQuestion = await chat.sendMessage(`La pregunta  ${question} tiene que ver con el siguiente texto ${START_CHAT[0].parts} responde con "SI" de lo contrario responde un "NO"`);
    const response = await sendQuestion.response;
    const text = response.text();
    console.log(text);

        if (text === 'SI' || text === 'SÍ') {
        return true;

    } else {
        return false;
        }
        
    } catch (error) {
        console.log("La IA NO FUNCIONA");
        console.log(error);
    }

};