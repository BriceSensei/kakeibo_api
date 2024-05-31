
import prisma from "@prisma/prisma";

import { BudgetLines } from "@prisma/client";

export class BudgetLineService{

    constructor(){
    }


    /**
     * Get all budgetLine from BudgetLines table
     * 
     * @returns Promise<BudgetLines>
     */
    async getAllBudgetLines() : Promise<BudgetLines[]>{
        const allBudgetLines : BudgetLines[] = await prisma.budgetLines.findMany();

        return allBudgetLines;
   }

   /**
    * Get one budgetLine from BudgetLines table
    * 
    * @param budgetLineId number
    * 
    * @returns Promise<BudgetLine>
    */
   async getOneBudgetLine(budgetLineId : number) : Promise<BudgetLines>{
        const budgetLine : BudgetLines = await prisma.budgetLines.findUniqueOrThrow({where :{id: budgetLineId}});

        return budgetLine;
   }

   /**
    * Create a new budgetLine from BudgetLines table
    * 
    * @param budgetLineData type BudgetLines
    * 
    * @returns Promise<BudgetLines>
    */
   async createOneBudgetLine(budgetLineData: BudgetLines) : Promise<BudgetLines>{
        const newBudgetLine : BudgetLines = await prisma.budgetLines.create({
            data:{
                userId: budgetLineData.userId,
                value: budgetLineData.value,
                title:budgetLineData.title,
                description:budgetLineData.description,
                date: new Date(),
                type: budgetLineData.type,
                frequencyId: budgetLineData.frequencyId,
                categoryId:budgetLineData.categoryId,
                subCategoryId: budgetLineData.subCategoryId,
                creationDate: new Date(),
                updateDate: new Date(),
            }
        });
        return newBudgetLine;
   }


   /**
     *Updating the budget row corresponding to the entered ID parameter from budgetLines table
    * 
    * @param budgetLineId number
    * @param budgetLineData type budgetLines
    * 
    * @returns Promise<BudgetLines>
    */
    async updateBudgetLine(budgetLineId: number, budgetLineData: BudgetLines): Promise<BudgetLines>{
        const budgetLine : BudgetLines = await prisma.budgetLines.update({where:{id: budgetLineId},
                data: budgetLineData
        })

        return budgetLine;
    }


    /**
     * Deleting the budget row corresponding to the entered ID parameter from budgetLines table
     * 
     * @param budgetLineId number
     * 
     * @returns alert objet had been deleted
     */
    async deleteOneBudgetLine(budgetLineId: number){
        const budgetLine: BudgetLines = await prisma.budgetLines.delete({where:{id: budgetLineId}})

        return budgetLine;
    }


    async getAnnualExpress(userId:number):Promise<any>{
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

        const expenses = await prisma.budgetLines.findMany({
            where: {
                userId: userId,
                date:{
                    gte: startOfYear,
                    lt: endOfYear
                }
            },
            orderBy:{
                date: 'asc'
            }
        });

        return expenses;
    }
}