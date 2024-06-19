import { BudgetLines } from "@prisma/client";

export interface BudgetLineResponse {
    budgetLines: BudgetLines[];
    totalValue: number;
    numberOfTransactions: number;
    averageDailyExpenses: number;
  }