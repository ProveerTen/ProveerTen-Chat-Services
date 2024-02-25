import { Request, Response } from "express";
import { get_providers_city } from "../service/provider";


export const filter_providers_city = async (req: Request, res: Response) => {

    try {
        const data = {
            companyId: req.body.companyId,
            grocerId: req.body.grocerId
        }
       
        
        let providersbycity = await get_providers_city(data);
        res.status(200).json({ providersbycity })
    }
    catch (error) {
        res.status(400).json({ message: "Error internal server" })
    }

}