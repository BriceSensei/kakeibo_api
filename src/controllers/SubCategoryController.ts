import { Request, Response } from 'express';
import { SubCategoriesService } from '../services/subCategoryService';
import { SubCategories } from '@prisma/client';


export class SubCategoriesController{

    async getAllSubCategories(req:Request, res:Response): Promise<void>{
        const allSubCategories : SubCategoriesService = new SubCategoriesService();

        try {
            const subCategories: SubCategories[] = await allSubCategories.getAllSubCategories();
            res.json(subCategories);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: 'Fail to get all subcategories'               
            }

            res.status(500).send(errMsg);
        }
    }


    async getSubCategoryById(req: Request, res: Response):Promise<void>{
        const subCategoryMethod : SubCategoriesService = new SubCategoriesService();
        const subCategoryId : number = parseInt(req.params.id);

        try {
            const subCategory : SubCategories = await subCategoryMethod.getOneSubCategory(subCategoryId);
            res.json(subCategory);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: 'Impossible de récuperer l'id d'une sous catégorie'
            }
            res.status(500).send(errMsg);
        }
    }


    async createNewSubCategory(req: Request, res: Response): Promise<void>{
        const subCategoryMethod : SubCategoriesService = new SubCategoriesService();
        const subCategoryData: SubCategories = { ...req.body};

        try {
           const subCategoryLine : SubCategories = await subCategoryMethod.createOneSubCategory(subCategoryData);
           res.json(subCategoryLine); 
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: 'Echec leur de la creation d'une nouvelle sous-catégorie'
            }
            res.status(500).send(errMsg);
        }
    }


    async updateOneSubCategory(req: Request, res:Response): Promise<void>{
        const subCategoryMethod: SubCategoriesService = new SubCategoriesService();
        const subCategoryData: SubCategories = req.body;
        const subCategoryId: number = parseInt(req.params.id);

        try {
            const subCategoryUpdate: SubCategories = await subCategoryMethod.updateSubCategory(subCategoryId, subCategoryData)
            res.json(subCategoryUpdate)
        } catch (error){
            const errMsg={
                status: 500,
                error: error,
                message: 'Fail to update one subcategory'
            }
            res.status(500).send(errMsg);
        }      
    }


    async deleteSubCategory(req: Request, res:Response){
        const subCategoryMethod:SubCategoriesService = new SubCategoriesService();
        const subCategoryId : number = parseInt(req.params.id)

        try {
            const subCategoryDeleted: SubCategories = await subCategoryMethod.deleteOneSubCategory(subCategoryId);
            res.json(subCategoryDeleted);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: 'Fail to delete subcategory in database'
            }
            res.status(500).send(errMsg);
        }
    }


}