
import { Alerts } from "@prisma/client";
import  prisma  from "@prisma/prisma";

class AlertService{
    constructor(){}

    async getAllAlerts(): Promise<Alerts[]>{
        const allAlerts: Alerts[] = await prisma.alerts.findMany();

        return allAlerts;
    }
}

export{AlertService};