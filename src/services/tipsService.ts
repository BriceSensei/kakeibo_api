import { Tips } from "@prisma/client";
import prisma from "@prisma/prisma";

class TipsService{

    constructor(){

    }

    async getAllTips() : Promise<Tips[]>{
        const allTips : Tips[] = await prisma.tips.findMany();
    
        return allTips;
    }

    async getOneTip(tipId : number) : Promise<Tips>{
        const oneTip : Tips = await prisma.tips.findUniqueOrThrow({where :{id: tipId}});

        return oneTip;
    }  

    async createOneTip(tipData: Tips) : Promise<Tips>{
        const createTip : Tips = await prisma.tips.create({data: tipData});
    
        return createTip;
    }


    async updateTip(tipId: number, tipData: Tips): Promise<Tips>{
        const tip : Tips = await prisma.tips.update({where:{id: tipId},
                data: tipData
        })

        return tip;
    }


    async deleteOneTip(tipId: number){
        const tip: Tips = await prisma.tips.delete({where:{id: tipId}})

        return tip;
    }

}

export{TipsService};