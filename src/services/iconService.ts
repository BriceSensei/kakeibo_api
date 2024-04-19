import prisma from "@prisma/prisma";

import {Icons} from "@prisma/client";


export class IconsService{

    constructor(){

    }

    /**
     * Get all icons from icons table
     * 
     * @returns Promise<Icons>
     */
    async getAllIcons() : Promise<Icons[]>{
        const allIcons : Icons[] = await prisma.icons.findMany();
    
        return allIcons;
    }

    /**
     * Get one icon from icons table
     * 
     * @param tipId number
     * 
     * @returns Promise<Icons>
     */
    async getOneIcon(tipId : number) : Promise<Icons>{
        const oneIcon : Icons = await prisma.icons.findUniqueOrThrow({where :{id: tipId}});

        return oneIcon;
    }

    /**
     * Create a new icon from icons table
     * 
     * @param iconData type Icons
     * 
     * @returns Promise<Icons>
     */
    async createOneIcon(iconData: Icons) : Promise<Icons>{
        const createIcon : Icons = await prisma.icons.create({data: iconData});
    
        return createIcon;
    }


    /**
     *Updating the icon corresponding to the entered ID parameter from icons table
     * 
     * @param iconId number 
     * @param iconData type Icons
     * 
     * @returns Promise<Icons>
     */
    async updateIicon(iconId: number, iconData: Icons): Promise<Icons>{
        const icon : Icons = await prisma.icons.update({
            where:{id: iconId},
            data: iconData
        })

        return icon;
    }


    /** 
     * Deleting the icon corresponding to the entered ID parameter from icons table
     * 
     * @param iconId number
     * 
     * @returns alert objet had been deleted
     */
    async deleteOneIcon(iconId: number){
        const icon: Icons = await prisma.icons.delete({where:{id: iconId}})

        return icon;
    }
}