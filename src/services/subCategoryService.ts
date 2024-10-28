import  prisma  from '@@prisma/prisma';

import {SubCategories} from '@prisma/client';


export class SubCategoriesService{

    constructor(){

    }

    /**
     * Get all subcategories from subcategories table
     * 
     * @returns Promise<SubCategories>
     */
    async getAllSubCategories() : Promise<SubCategories[]>{
        const allSubCategories : SubCategories[] = await prisma.subCategories.findMany();
    
        return allSubCategories;
    }

    /**
     * Get one subcategory from subcategories table
     * 
     * @param subCategoryId number
     * 
     * @returns Promise<SubCategories>
     */
    async getOneSubCategory(subCategoryId : number) : Promise<SubCategories>{
        const oneSubCategory : SubCategories = await prisma.subCategories.findUniqueOrThrow({where :{id: subCategoryId}});

        return oneSubCategory;
    }

    /**
     * Create a new subcategory from subcategories
     * 
     * @param subCategoryData type SubCategories
     * 
     * @returns Promise<SubCategories>
     */
    async createOneSubCategory(subCategoryData: SubCategories) : Promise<SubCategories>{
        const createSubCategory : SubCategories = await prisma.subCategories.create({
            data:{
            name: subCategoryData.name,
            iconId: subCategoryData.iconId,
            color: subCategoryData.color,
            creationDate: new Date(),
            updateDate: new Date(),
            parentId: subCategoryData.parentId,
            userId: subCategoryData.userId,
           // userGroups: subCategoryData.userGroupsId,
            },
        });
    
        return createSubCategory;
       }

    /**
     *Updating the subcategory corresponding to the entered ID parameter from subcategories table
     * 
     * @param subCategoryId number
     * @param subCategoryData type SubCategories
     * 
     * @returns Promise<SubCategories>
     */   
    async updateSubCategory(subCategoryId: number, subCategoryData: SubCategories): Promise<SubCategories>{
        const subCategory : SubCategories = await prisma.subCategories.update({where:{id: subCategoryId},
                data: subCategoryData
        })

        return subCategory;
    }

    /**
     * Deleting the subcategory corresponding to the entered ID parameter from subcategories table
     * 
     * @param subCategoryId number
     * 
     * @returns subcategory objet had been deleted
     */
    async deleteOneSubCategory(subCategoryId: number){
        const subCategory: SubCategories = await prisma.subCategories.delete({where:{id: subCategoryId}})

        return subCategory;
    }
}
