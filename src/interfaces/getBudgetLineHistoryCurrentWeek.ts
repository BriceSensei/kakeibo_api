import { BudgetLines } from "@prisma/client";

export interface BudgetLineHistoryCurrentWeek {
    budgetLines: {id: number; userId: number; value: number; title: string; description:string | null ; type: string; frequencyId: number | null; categoryId: number; subCategoryId: number | null}[];
    totalValue: number;
    numberOfTransactions: number;
    averageDailyExpenses: number;
}