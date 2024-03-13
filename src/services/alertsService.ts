
import { Alerts } from "@prisma/client";
import  prisma  from "@prisma/prisma";

class AlertService{
    constructor(){}

    async getAllAlerts(): Promise<Alerts[]>{
        const allAlerts: Alerts[] = await prisma.alerts.findMany();

        return allAlerts;
    }

    async getOneAlert(alertId : number) : Promise<Alerts>{
        const alert : Alerts = await prisma.alerts.findUniqueOrThrow({
            where: {id: alertId},
        })
        
        return alert;
    }

    async createNewAlert(alertData: Alerts) : Promise<Alerts>{
        const alert : Alerts = await prisma.alerts.create({data: alertData})

        return alert;
    }

    async updateOneAlert(alertId: number, alertData : Alerts) : Promise<Alerts>{
        const alert : Alerts = await prisma.alerts.update({
            where:{id: alertId},
            data: alertData
        })

        return alert;
    }

    async deleteOneAlert(alertId: number){
        const alert: Alerts = await prisma.alerts.delete({where:{id:alertId}})

        return alert;
    }
}

export{AlertService};