import express, { Request, Response, Router } from "express";
import { UnimplementedError } from "../exceptions/UnimplementedError";
import { BudgetLineController } from "@controller/BudgetLineController";

import { authentificateToken } from "../middlewares/authentificateToken";

const budgetLineRoute: Router = express.Router();
const budgetLineController: BudgetLineController = new BudgetLineController();

budgetLineRoute.post("/:id", budgetLineController.createNewBudgetLine);
budgetLineRoute.get("/", budgetLineController.getAllBudgetLines);
budgetLineRoute.get("/:id", budgetLineController.getBudgetLineById);

// Get all alerts from user
budgetLineRoute.get("/user/:userId", (req: Request, res: Response): void => {
  throw new UnimplementedError();
});

budgetLineRoute.patch("/:id", budgetLineController.updateOneBudgetLine);
budgetLineRoute.delete("/:id", budgetLineController.deleteOneBudgebudgetLine);

budgetLineRoute.get(
  "/expenses/annual",
  authentificateToken,
  budgetLineController.getAnnualExpenses
);
budgetLineRoute.get(
  "/expenses/monthly",
  authentificateToken,
  budgetLineController.getMonthlyExpenses
);

budgetLineRoute.get(
  "/expenses/weekly",
  authentificateToken,
  budgetLineController.getWeeklyExpenses
);

//**************Dashboard***************///
budgetLineRoute.get(
  "/expenses/weekly/statsOne",
  authentificateToken,
  budgetLineController.getWeeklyExpensesStatsOne
);

budgetLineRoute.get("/expenses/weekly/CategoryStatsWeek/:categoryId", authentificateToken, budgetLineController.getCategoryStatsForWeek);

budgetLineRoute.get("/expenses/weekly/BudgetLineHistory", authentificateToken, budgetLineController.getBudgetLineHistory);


///////////////////////////////////////////


budgetLineRoute.get(
  "/expenses/category/:categoryId/current-month",
  authentificateToken,
  budgetLineController.getMonthlyExpensesByCategory
);

budgetLineRoute.get(
  "/expenses/category",
  authentificateToken,
  budgetLineController.getExpensesByMonthAndCategory
);

export default budgetLineRoute;
