import {SubCategories} from "@prisma/client";
import  prisma  from "@prisma/prisma";


class SubCategoriesService{

    constructor(){

    }

    async getAllSubCategories() : Promise<SubCategories[]>{
        const allSubCategories : SubCategories[] = await prisma.subCategories.findMany();
    
        return allSubCategories;
    }

    async getOneSubCategory(subCategoryId : number) : Promise<SubCategories>{
        const oneSubCategory : SubCategories = await prisma.subCategories.findUniqueOrThrow({where :{id: subCategoryId}});

        return oneSubCategory;
    }

    async createOneSubCategory(subCategoryData: SubCategories) : Promise<SubCategories>{
        const createSubCategory : SubCategories = await prisma.subCategories.create({data: subCategoryData});
    
        return createSubCategory;
       }

       async updateSubCategory(subCategoryId: number, subCategoryData: SubCategories): Promise<SubCategories>{
        const subCategory : SubCategories = await prisma.subCategories.update({where:{id: subCategoryId},
                data: subCategoryData
        })

        return subCategory;
    }


    async deleteOneSubCategory(subCategoryId: number){
        const subCategory: SubCategories = await prisma.subCategories.delete({where:{id: subCategoryId}})

        return subCategory;
    }

}

export{SubCategoriesService};