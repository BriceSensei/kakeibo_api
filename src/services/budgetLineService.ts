
import { BudgetLines } from "@prisma/client";
import prisma from "@prisma/prisma";

class BudgetLineService{

    constructor(){
    }

   async getAllBudgetLines() : Promise<BudgetLines[]>{
    const allBudgetLines : BudgetLines[] = await prisma.budgetLines.findMany();

    return allBudgetLines;
   }

   async getOneBudgetLine(budgetLineId : number) : Promise<BudgetLines>{
    const budgetLine : BudgetLines = await prisma.budgetLines.findUniqueOrThrow({where :{id: budgetLineId}});

    return budgetLine;
   }

   async createOneBudgetLine(budgetLineData: BudgetLines) : Promise<BudgetLines>{
    const budgetLine : BudgetLines = await prisma.budgetLines.create({data: budgetLineData});

    return budgetLine;
   }

    async updateBudgetLine(budgetLineId: number, budgetLineData: BudgetLines): Promise<BudgetLines>{
        const budgetLine : BudgetLines = await prisma.budgetLines.update({where:{id: budgetLineId},
                data: budgetLineData
        })

        return budgetLine;
    }


    async deleteOneBudgetLine(budgetLineId: number){
        const budgetLine: BudgetLines = await prisma.budgetLines.delete({where:{id: budgetLineId}})

        return budgetLine;
    }

}

export{BudgetLineService};