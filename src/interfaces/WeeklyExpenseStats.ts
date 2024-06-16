import { BudgetLinesInterface } from "./BudgetLines";

export interface WeeklyExpenseStats {
  totalExpenses: number;
  numberOfTransactions: number;
  averageDailyExpenses: number;
  expenses: BudgetLinesInterface[];
}
