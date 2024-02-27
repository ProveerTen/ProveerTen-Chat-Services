import { Request, Response } from "express";
import model from "../models/chat";
import generateRandomString from "../helpers/generate-string";

export const createChat = async (req: Request, res: Response) => {
  let participants = req.body

  const newChat = new model.Chat({
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
  let chat = await model.Chat.find({participants: participants })
  res.status(200).json({ chat })
}

export const messages = async (req: Request, res: Response) => {
  const chatId = req.body.chatId;
  let messages = await model.Chat.find({ chatId })
  res.status(200).json({messages})
}
