import prisma from "@prisma/prisma";

import { BudgetLines } from "@prisma/client";
import { startOfWeek, endOfWeek } from "date-fns";
import { WeeklyExpenseStats } from "../interfaces/WeeklyExpenseStats";

export class BudgetLineService {
  constructor() {}

  /**
   * Get all budgetLine from BudgetLines table
   *
   * @returns Promise<BudgetLines>
   */
  async getAllBudgetLines(): Promise<BudgetLines[]> {
    const allBudgetLines: BudgetLines[] = await prisma.budgetLines.findMany();

    return allBudgetLines;
  }

  /**
   * Get one budgetLine from BudgetLines table
   *
   * @param budgetLineId number
   *
   * @returns Promise<BudgetLine>
   */
  async getOneBudgetLine(budgetLineId: number): Promise<BudgetLines> {
    const budgetLine: BudgetLines = await prisma.budgetLines.findUniqueOrThrow({
      where: { id: budgetLineId },
    });

    return budgetLine;
  }

  /**
   * Create a new budgetLine from BudgetLines table
   *
   * @param budgetLineData type BudgetLines
   *
   * @returns Promise<BudgetLines>
   */
  async createOneBudgetLine(budgetLineData: BudgetLines): Promise<BudgetLines> {
    const newBudgetLine: BudgetLines = await prisma.budgetLines.create({
      data: {
        userId: budgetLineData.userId,
        value: budgetLineData.value,
        title: budgetLineData.title,
        description: budgetLineData.description,
        date: new Date(),
        type: budgetLineData.type,
        frequencyId: budgetLineData.frequencyId,
        categoryId: budgetLineData.categoryId,
        subCategoryId: budgetLineData.subCategoryId,
        creationDate: new Date(),
        updateDate: new Date(),
      },
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
  async updateBudgetLine(
    budgetLineId: number,
    budgetLineData: BudgetLines
  ): Promise<BudgetLines> {
    const budgetLine: BudgetLines = await prisma.budgetLines.update({
      where: { id: budgetLineId },
      data: budgetLineData,
    });

    return budgetLine;
  }

  /**
   * Deleting the budget row corresponding to the entered ID parameter from budgetLines table
   *
   * @param budgetLineId number
   *
   * @returns alert objet had been deleted
   */
  async deleteOneBudgetLine(budgetLineId: number) {
    const budgetLine: BudgetLines = await prisma.budgetLines.delete({
      where: { id: budgetLineId },
    });

    return budgetLine;
  }

  async getAnnualExpenses(
    userId: number,
    year: number
  ): Promise<BudgetLines[]> {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const expenses = await prisma.budgetLines.findMany({
      where: {
        userId: userId,
        date: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return expenses;
  }

  async getMonthExpenses(
    userId: number,
    year: number,
    month: number
  ): Promise<BudgetLines[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const expenses = await prisma.budgetLines.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return expenses;
  }

  async getWeeklyExpenses(userId: number): Promise<BudgetLines[]> {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay()) + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const expenses = await prisma.budgetLines.findMany({
      where: {
        userId: userId,
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return expenses;
  }

  async getMonthExpensesByCategory(
    userId: number,
    categoryId: number
  ): Promise<BudgetLines[]> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const expenses = await prisma.budgetLines.findMany({
      where: {
        userId: userId,
        categoryId: categoryId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return expenses;
  }

  async getExpensesByMonthAndCategory(
    userId: number,
    year: number,
    month: number,
    categoryId: number
  ): Promise<BudgetLines[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);

    const expenses = await prisma.budgetLines.findMany({
      where: {
        userId: userId,
        categoryId: categoryId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return expenses;
  }

  async getWeeklyExpensesStats(userId: number): Promise<WeeklyExpenseStats> {
    const now = new Date();
    //commence le lundi
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    //termine le dimanche
    const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });

    try {
      const expenses =
        await prisma.budgetLines.findMany({
          where: {
            userId: userId,
            date: {
              gte: startOfWeekDate,
              lte: endOfWeekDate,
            },
          },
          orderBy: {
            date: "asc",
          },
          include: {
            category: true,
            subCategory: true,
          },
        });

      // Calculer les statistiques
      const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.value,
        0
      );
      const numberOfTransactions = expenses.length;
      const averageDailyExpenses = totalExpenses / 7;

      return {
        totalExpenses,
        numberOfTransactions,
        averageDailyExpenses,
        expenses,
      };

    } catch (error) {
      throw new Error("Failed to retrieve weekly expenses");
    }
  }


  
}
