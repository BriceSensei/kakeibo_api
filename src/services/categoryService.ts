
import {Categories } from "@prisma/client";
import  prisma  from "@prisma/prisma";


class CategoryService {
    constructor() {}

    async getAllCategories() : Promise<Categories[]>{
        const allCategories : Categories[] = await prisma.categories.findMany();

        return allCategories;
    }

    async getOneCategory(categoryId : number) : Promise<Categories>{
        const category : Categories = await prisma.categories.findUniqueOrThrow({
            where: {id: categoryId},
        })
        
        return category;
    }

    async createNewCategory(categoryData: Categories) : Promise<Categories>{
        const category : Categories = await prisma.categories.create({data: categoryData})

        return category;
    }

    async updateOneCategory(categoryId: number, categoryData : Categories) : Promise<Categories>{
        const category : Categories = await prisma.categories.update({
            where:{id: categoryId},
            data: categoryData
        })

        return category;
    }

    async deleteOneCategory(categoryId: number){
        const category: Categories = await prisma.categories.delete({where:{id:categoryId}})

        return category;
    }
}

export{CategoryService};