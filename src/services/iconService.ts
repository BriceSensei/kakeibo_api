import {Icons} from "@prisma/client";
import prisma from "@prisma/prisma";


class IconsService{

    constructor(){

    }


    async getAllIcons() : Promise<Icons[]>{
        const allIcons : Icons[] = await prisma.icons.findMany();
    
        return allIcons;
    }
    
    async getOneIcon(tipId : number) : Promise<Icons>{
        const oneIcon : Icons = await prisma.icons.findUniqueOrThrow({where :{id: tipId}});

        return oneIcon;
    }

    async createOneIcon(iconData: Icons) : Promise<Icons>{
        const createIcon : Icons = await prisma.icons.create({data: iconData});
    
        return createIcon;
    }

    async updateIicon(iconId: number, iconData: Icons): Promise<Icons>{
        const icon : Icons = await prisma.icons.update({where:{id: iconId},
                data: iconData
        })

        return icon;
    }


    async deleteOneIcon(iconId: number){
        const icon: Icons = await prisma.icons.delete({where:{id: iconId}})

        return icon;
    }


}

export{IconsService};