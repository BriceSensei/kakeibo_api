import prisma from "@prisma/prisma";

import { Tips } from "@prisma/client";

export class TipsService{

    constructor(){

    }

    /**
     * Get all tips from tips table
     * 
     * @returns Promise<Tips>
     */
    async getAllTips() : Promise<Tips[]>{
        const allTips : Tips[] = await prisma.tips.findMany();
    
        return allTips;
    }

    /**
     * Get one tip from tips table
     * 
     * @param tipId number
     * 
     * @returns Promise<Tips>
     */
    async getOneTip(tipId : number) : Promise<Tips>{
        const oneTip : Tips = await prisma.tips.findUniqueOrThrow({where :{id: tipId}});

        return oneTip;
    }  

    /**
     * Create a new tips from tips table
     * 
     * @param tipData type Tips
     * 
     * @returns Promise<Tips>
     */
    async createOneTip(tipData: Tips) : Promise<Tips>{
        const createTip : Tips = await prisma.tips.create({data: tipData});
    
        return createTip;
    }

    /**
     *Updating the tip corresponding to the entered ID parameter from tips table
     * 
     * @param tipId number
     * @param tipData type Tips
     * 
     * @returns Promise<Tips>
     */
    async updateTip(tipId: number, tipData: Tips): Promise<Tips>{
        const tip : Tips = await prisma.tips.update({where:{id: tipId},
                data: tipData
        })

        return tip;
    }

    /**
     *Deleting the tip corresponding to the entered ID parameter from tips table
     * 
     * @param tipId number
     * 
     * @returns tip objet had been deleted
     */
    async deleteOneTip(tipId: number){
        const tip: Tips = await prisma.tips.delete({where:{id: tipId}})

        return tip;
    }

}
