
//mport { BudgetLines } from "@prisma/client";
export interface WeeklyExpenseStatsOne {
  totalExpenses: number;
  numberOfTransactions: number;
  averageDailyExpenses: number;
  expenses: { id: number; value: number; categoryId: number; categoryName: string }[];
  categoryStats: Record<string, {categoryId: number, totalValue: number, transactions: number}>;
}
