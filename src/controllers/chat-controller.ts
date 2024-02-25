import { Request, Response } from "express";
import Chat from "../models/chat";
import generateRandomString from "../helpers/generate-string";

export const createChat = async (req: Request, res: Response) => {
  let participants = req.body

  const newChat = new Chat({
    _id: generateRandomString(10),
    participants: participants,
    messages: null
  });
  //console.log(newChat);
  await newChat.save();

  res.status(200).json({ chat: newChat })
}


export const findChat = async (req: Request, res: Response) => {
  const participants = req.body;
  let chat = await Chat.find({participants: participants })
  //console.log(chat);
  res.status(200).json({ chat })
}
