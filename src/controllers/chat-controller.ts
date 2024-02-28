import { Request, Response } from "express";
import model from "../models/chat";
import generateRandomString from "../helpers/generate-string";

export const createChat = async (req: Request, res: Response) => {
  let participants = req.body

  const newChat = new model.Chat({
    _id: generateRandomString(10),
    participants: participants,
    messages: []
  });
  //console.log(newChat);
  await newChat.save();

  res.status(200).json({ chat: newChat })
}


export const findChat = async (req: Request, res: Response) => {
  const participants = req.body;
  let chat = await model.Chat.find({participants: participants })
  res.status(200).json({ chat })
}

export const messages = async (req: Request, res: Response) => {
  const chatId = req.body.chatId;
  let chat = await model.Chat.find({ _id: chatId });
  res.status(200).json({ chat:chat[0] });
}

export const getchats = async (req: Request, res: Response) => {
  try {
    let role:string = req.body.role;
    let id:string = req.body.id;
    let field:any = `participants.${role}Id`;

    let search:any = {};
    search[field] = id;

    console.log(search);
    let values:any = role === 'grocer' ? {_id: 1,'participants.providerId': 1 } : {_id: 1, 'participants.grocerId': 1} ;
    let chats = await model.Chat.find(search).select(values);

    res.status(200).json({ chats });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
