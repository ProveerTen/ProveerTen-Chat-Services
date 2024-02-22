import { Request, Response } from "express";
import { getData } from "../service/provider";


export const idProvider = async (req: Request, res: Response) => {
    const data = {
        companyId : req.body.companyId,
        grocerId : req.body.grocerId 
    }
      await getData(data);
      res.status(200).json({ message: 'Ok' })
}