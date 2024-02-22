import { Request, Response } from "express";
import Chat from "../models/chat";
import generateRandomString from "../helpers/generate-string";

export const createChat = async (req:Request, res:Response)=>{

    console.log("LLega Al Controlador");
    
   console.log(req.body);
   
    const participants = req.body.participants;

    const newChat = new Chat({
        _id: generateRandomString(10),
        participants: participants,
        messages: null
      });
      await newChat.save();
      res.status(200).json({message: 'LISTOOOOOOO'})

    }