import { Categories } from "@prisma/client";
import { CategoriesInterface } from "../interfaces/Categories";
import { CategoryService } from "../services/categoryService";
import { Request, Response } from "express";


export class CategoryController{

    async getAllCategories(req:Request, res:Response): Promise<void>{
        const allCategories : CategoryService = new CategoryService();

        try {
            const categories: Categories[] = await allCategories.getAllCategories(); 
            res.json(categories);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible d'afficher les catégories"               
            }

            res.status(5000).send(errMsg);
        }
    }


    async getCategoryById(req: Request, res: Response):Promise<void>{
        const categoryMethod : CategoryService = new CategoryService();
        const categoryId : number = parseInt(req.params.id);

        try {
            const categories : Categories = await categoryMethod.getOneCategory(categoryId);
            res.json(categories);
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Impossible de récuperer l'id d'une catégorie"
            }
            res.status(500).send(errMsg);
        }
    }

    async createNewCategory(req: Request, res: Response): Promise<void>{
        const categoryMethod : CategoryService = new CategoryService;
        const categoryData: Categories = { ...req.body};

        try {
           const category : Categories = await categoryMethod.createNewCategory(categoryData);
           res.json(category); 
        } catch (error) {
            const errMsg = {
                status: 500,
                error: error,
                message: "Echec leur de la creation d'une nouvelle catégorie"
            }
            res.status(500).send(errMsg);
        }
    }
}