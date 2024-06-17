
import { BudgetLines } from "@prisma/client";
export interface WeeklyExpenseStats {
  totalExpenses: number;
  numberOfTransactions: number;
  averageDailyExpenses: number;
  expenses: BudgetLines[];
}
