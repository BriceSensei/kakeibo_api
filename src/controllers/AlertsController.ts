import { Alerts } from "@prisma/client";
import { AlertService } from "../services/alertsService";
import { Request, Response } from "express";


export class AlertController{

    async getAllAlertes(req:Request, res:Response): Promise<void>{
        const allAlerts : AlertService = new AlertService();

        try {
            const alerts: Alerts[] = await allAlerts.getAllAlerts(); 
            res.json(alerts);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible d'afficher les alertes"               
            }

            res.status(5000).send(errMsg);
        }
    }


    async getCategoryById(req: Request, res: Response):Promise<void>{
        const alertMethod : AlertService = new AlertService();
        const alertId : number = parseInt(req.params.id);

        try {
            const alert : Alerts = await alertMethod.getOneAlert(alertId);
            res.json(alert);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible de récuperer l'id d'une alert"
            }
            res.status(500).send(errMsg);
        }
    }

    async createNewAlert(req: Request, res: Response): Promise<void>{
        const alertMethod : AlertService = new AlertService;
        const alertData: Alerts = { ...req.body};

        try {
           const alert : Alerts = await alertMethod.createNewAlert(alertData);
           res.json(alert); 
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Echec leur de la creation d'une nouvelle catégorie"
            }
            res.status(500).send(errMsg);
        }
    }

    async updateOneAlert(req: Request, res:Response): Promise<void>{
        const alertMethod: AlertService = new AlertService();
        const alertData: Alerts = req.body;
        const alertId: number = parseInt(req.params.id);

        try {
            const alertUpdate: Alerts = await alertMethod.updateOneAlert(alertId, alertData)
            res.json(alertUpdate)
        } catch (error){
            const errMsg={
                status: 500,
                error: error,
                message: "Fail to update alert"
            }
            res.status(500).send(errMsg);
        }
    }

     async deleteOneAlert(req: Request, res:Response){
        const alertMethod: AlertService = new AlertService();
        const alertId : number = parseInt(req.params.id)

        try {
            const alertDeleted: Alerts = await alertMethod.deleteOneAlert(alertId);
            res.json(alertDeleted);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Fail to delete category in database"
            }
            res.status(500).send(errMsg);
        }
    }
 }