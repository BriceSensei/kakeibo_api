import { BudgetLines } from "@prisma/client";

export interface BudgetLineHistory {
    budgetLines: {id: number; userId: number; value: number; title: string; description:string | null ; date: Date; type: string; frequencyId: number | null; categoryId: number; subCategoryId: number | null}[];
    totalValue: number;
    numberOfTransactions: number;
    averageDailyExpenses: number;
}