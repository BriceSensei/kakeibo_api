import { Request, Response } from "express";
import { BudgetLineService } from "../services/budgetLineService";
import { BudgetLines } from "@prisma/client";
import { Users } from "@prisma/client";

interface CustomRequest extends Request {
  // Utilisation de l'interface Users pour annoter le type de la propriété 'user'
  user?: Users;
}

export class BudgetLineController {
  async getAllBudgetLines(req: Request, res: Response): Promise<void> {
    const allBudgetLines: BudgetLineService = new BudgetLineService();

    // Récupération des paramètres optionnels de la requête
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const order = (req.query.order as "asc" | "desc") || "asc";
    const begin = req.query.begin
      ? new Date(req.query.begin as string)
      : undefined;
    console.log(limit, order, begin);

    try {
      const budgetLines: BudgetLines[] = await allBudgetLines.getAllBudgetLines(
        limit,
        order,
        begin
      );
      res.json(budgetLines);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to get all budgetLines",
      };

      res.status(500).send(errMsg);
    }
  }

  async getBudgetLineById(req: Request, res: Response): Promise<void> {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const budgetLineId: number = parseInt(req.params.id);

    try {
      const budgetLine: BudgetLines = await budgetLineMethod.getOneBudgetLine(
        budgetLineId
      );
      res.json(budgetLine);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Impossible de récuperer l'id d'une alert",
      };
      res.status(500).send(errMsg);
    }
  }

  async createNewBudgetLine(req: Request, res: Response): Promise<void> {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const budgetLineData: BudgetLines = { ...req.body };

    try {
      const budgetLine: BudgetLines =
        await budgetLineMethod.createOneBudgetLine(budgetLineData);
      res.status(201).json(budgetLine);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Echec leur de la creation d'une nouvelle ligne de budget",
      };
      res.status(500).send(errMsg);
    }
  }

  async updateOneBudgetLine(req: Request, res: Response): Promise<void> {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const budgetLineData: BudgetLines = req.body;
    const budgetLineId: number = parseInt(req.params.id);

    try {
      const budgetLineUpdate: BudgetLines =
        await budgetLineMethod.updateBudgetLine(budgetLineId, budgetLineData);
      res.json(budgetLineUpdate);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to update one budgetLine",
      };
      res.status(500).send(errMsg);
    }
  }

  async deleteOneBudgebudgetLine(req: Request, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const budgetLineId: number = parseInt(req.params.id);

    try {
      const budgetLineDeleted: BudgetLines =
        await budgetLineMethod.deleteOneBudgetLine(budgetLineId);
      return res.json(budgetLineDeleted);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to delete budgetLine in database",
      };
      res.status(500).send(errMsg);
    }
  }

  async getAnnualExpenses(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const { year } = req.query;
    try {
      if (!year || isNaN(Number(year))) {
        return res.status(400).json({ message: "Invalid year parameter" });
      }

      const userId: number | undefined = req.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ message: "User not authentificated" });
      }

      const expenses = await budgetLineMethod.getAnnualExpenses(
        userId,
        Number(year)
      );
      if (expenses.length === 0) {
        return res
          .status(200)
          .json({ message: "No expenses found for the specified year" });
      }
      return res.status(200).json(expenses);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve annual expenses" });
    }
  }

  async getMonthlyExpenses(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const { year, month } = req.query;

    try {
      if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
        return res.status(400).json({ message: "Invalid year parameter" });
      }

      const userId: number | undefined = req.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ message: "User not authentificated" });
      }

      const expenses = await budgetLineMethod.getMonthExpenses(
        userId,
        Number(year),
        Number(month)
      );
      if (expenses.length === 0) {
        return res
          .status(200)
          .json({ message: "No expenses found for the specified year" });
      }
      return res.status(200).json(expenses);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve annual expenses" });
    }
  }

  async getWeeklyExpenses(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    try {
      const userId: number | undefined = req.user?.id;
      if (userId === undefined) {
        return res.status(401).json({ message: "User not authentificated" });
      }
      const expenses = await budgetLineMethod.getWeeklyExpenses(userId);

      if (expenses.length === 0) {
        return res
          .status(200)
          .json({ message: "No expenses found for the current week" });
      }
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve weekly expenses" });
    }
  }

  async getMonthlyExpensesByCategory(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const { categoryId } = req.params;
    const userId: number | undefined = req.user?.id;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation du paramètre categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
      const expensesByCategory =
        await budgetLineMethod.getMonthExpensesByCategory(
          userId,
          Number(categoryId)
        );
      if (expensesByCategory.length === 0) {
        return res
          .status(200)
          .json({ message: "No expenses found for the current month" });
      }

      res.status(200).json(expensesByCategory);
    } catch (error) {
      console.error("Error retrieving monthly expenses by category:", error);
      res
        .status(500)
        .json({ message: "Failed to retrieve monthly expenses by category" });
    }
  }

  async getExpensesByMonthAndCategory(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();
    const { year, month, categoryId } = req.query;
    const userId: number | undefined = req.user?.id;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation des paramètres year, month et categoryId
    if (
      !year ||
      !month ||
      !categoryId ||
      isNaN(Number(year)) ||
      isNaN(Number(month)) ||
      isNaN(Number(categoryId))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid year, month, or categoryId parameter" });
    }

    try {
      const expenses = await budgetLineMethod.getExpensesByMonthAndCategory(
        userId,
        Number(year),
        Number(month),
        Number(categoryId)
      );
      if (expenses.length === 0) {
        return res
          .status(200)
          .json({ message: "No expenses found for the current month" });
      }
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to retrieve expenses for the selected month and category",
      });
    }
  }

  /**************DASHBOARD******************/

  async getWeeklyExpensesStatsOne(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    try {
      const stats = await budgetLineMethod.getWeeklyExpensesStatsOne(userId);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve weekly expenses" });
    }
  }

  async getMonthlyExpensesStatsOne(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    try {
      const stats = await budgetLineMethod.getWeeklyExpensesStatsOne(userId);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve weekly expenses" });
    }
  }

  async getCategoryStatsForWeek(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;
    const { categoryId } = req.params;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation du paramètre categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
      const stats = await budgetLineMethod.getCategoryStatsForWeek(
        userId,
        Number(categoryId)
      );
      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve category stats for week" });
    }
  }


  async getCategoryStatsForMonth(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;
    const { categoryId } = req.params;

    if (userId === undefined) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation du paramètre categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
      const stats = await budgetLineMethod.getCategoryStatsForWeek(
        userId,
        Number(categoryId)
      );
      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve category stats for week" });
    }
  }




  async getBudgetLineHistoryCurrentWeek(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;
    const { categoryId, subCategoryId } = req.query;
    console.log(categoryId, subCategoryId);

    if (userId === undefined || isNaN(Number(userId))) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation du paramètre categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    if (!subCategoryId || isNaN(Number(subCategoryId))) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    try {
      const stats = await budgetLineMethod.getBudgetLineHistoryCurrentWeek(
        userId,
        Number(categoryId),
        Number(subCategoryId)
      );
      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve category stats for week" });
    }
  }


  async getBudgetLineHistoryCurrentMonth(req: CustomRequest, res: Response) {
    const budgetLineMethod: BudgetLineService = new BudgetLineService();

    const userId: number | undefined = req.user?.id;
    const { categoryId, subCategoryId } = req.query;
    console.log(categoryId, subCategoryId);

    if (userId === undefined || isNaN(Number(userId))) {
      return res.status(401).json({ message: "User not authentificated" });
    }

    // Validation du paramètre categoryId
    if (!categoryId || isNaN(Number(categoryId))) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    if (!subCategoryId || isNaN(Number(subCategoryId))) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    try {
      const stats = await budgetLineMethod.getBudgetLineHistoryCurrentMonth(
        userId,
        Number(categoryId),
        Number(subCategoryId)
      );
      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve category stats for week" });
    }
  }
  ////////////////////////////////////////////////////////////////
}
