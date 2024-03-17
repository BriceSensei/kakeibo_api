import { Request, Response } from "express";
import { Icons } from "@prisma/client";
import { IconsService } from "../services/iconService";


export class IconsController{

    async getAllIcons(req:Request, res:Response): Promise<void>{
        const allIcons : IconsService = new IconsService();

        try {
            const icons: Icons[] = await allIcons.getAllIcons();
            res.json(icons);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to get all icons"               
            }

            res.status(500).send(errMsg);
        }
    }

    async getIconById(req: Request, res: Response):Promise<void>{
        const iconMethod : IconsService = new IconsService();
        const iconId : number = parseInt(req.params.id);

        try {
            const icon : Icons = await iconMethod.getOneIcon(iconId);
            res.json(icon);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible de récuperer l'id d'une icone"
            }
            res.status(500).send(errMsg);
        }
    }


    async createNewIcon(req: Request, res: Response): Promise<void>{
        const iconMethod : IconsService = new IconsService();
        const iconData: Icons = { ...req.body};

        try {
           const iconLine : Icons = await iconMethod.createOneIcon(iconData);
           res.json(iconLine); 
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Echec leur de la creation d'un nouveau icone"
            }
            res.status(500).send(errMsg);
        }
    }


    async updateOneIcon(req: Request, res:Response): Promise<void>{
        const iconMethod: IconsService = new IconsService();
        const iconData: Icons = req.body;
        const iconId: number = parseInt(req.params.id);

        try {
            const iconUpdate: Icons = await iconMethod.updateIicon(iconId, iconData)
            res.json(iconUpdate)
        } catch (error){
            const errMsg={
                status: 500,
                error: error,
                message: "Fail to update one icon"
            }
            res.status(500).send(errMsg);
        }
    }

    async deleteOneIcon(req: Request, res:Response){
        const iconMethod: IconsService = new IconsService();
        const iconId : number = parseInt(req.params.id)

        try {
            const iconDeleted: Icons = await iconMethod.deleteOneIcon(iconId);
            res.json(iconDeleted);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to delete icon in database"
            }
            res.status(500).send(errMsg);
        }
    }

}