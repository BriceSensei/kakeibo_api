import prisma from "@prisma/prisma";

import { BudgetLines } from "@prisma/client";
import { startOfWeek, endOfWeek } from "date-fns";
import { WeeklyExpenseStatsOne} from "../interfaces/WeeklyExpenseStatsOne";
import { CategoryStats, subCategoryStats} from "../interfaces/getCategoryStatsForWeek";

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

  /**********DASHBOARD***********/

  async getWeeklyExpensesStatsOne(userId: number): Promise<WeeklyExpenseStatsOne> {
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
          //  include: {
          //    category: true,
          // //   subCategory: true,
          //  },
          select: {
            id: true,
            value: true,
            category: {
              select: {
                id: true,
                name: true,
              }
            },
          }
        });

      // Calculer les statistiques globales
      const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.value,
        0
      );
      const numberOfTransactions = expenses.length;
      const averageDailyExpenses = totalExpenses / 7;

 // Calculer les statistiques par catégorie
 const categoryStats = expenses.reduce((stats, expense) => {
  const categoryId = expense.category.id;
  const categoryName = expense.category.name;
  if (!stats[categoryName]) {
    stats[categoryName] = { categoryId, totalValue: 0, transactions: 0 };
  }
  stats[categoryName].totalValue += expense.value;
  stats[categoryName].transactions += 1;
  return stats;
}, {} as Record<string, { categoryId: number, totalValue: number, transactions: number }>);

   // Transformer les dépenses pour ne garder que les informations nécessaires
   const transformedExpenses = expenses.map(expense => ({
    id: expense.id,
    value: expense.value,
    categoryId: expense.category.id,
    categoryName: expense.category.name,
  }));

      return {
        totalExpenses,
        numberOfTransactions,
        averageDailyExpenses,
        expenses: transformedExpenses,
        categoryStats,
      };

    } catch (error) {
      throw new Error("Failed to retrieve weekly expenses");
    }
  }


  async getCategoryStatsForWeek(userId: number, categoryId: number): Promise<CategoryStats> {
    const now = new Date();
    //commence le lundi
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    //termine le dimanche
    const endOfWeekDate = endOfWeek(now, { weekStartsOn: 1 });

    try {
      const expenses  =
        await prisma.budgetLines.findMany({
          where: {
            userId: userId,
            categoryId: categoryId,
            date: {
              gte: startOfWeekDate,
              lte: endOfWeekDate,
            },
          },
          orderBy: {
            date: "asc",
          },
          select: {
            value: true,
            subCategory: {
              select: {
                id: true,
                name: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },    
        });
    
    // Initialisation des valeurs par défaut pour les statistiques globales
    let totalValue = 0;
    let transactions = 0;
    const subCategoryStats: Record<string, subCategoryStats> = {};

    if (expenses.length > 0) {
      // Calcul du total des dépenses et du nombre de transactions
      totalValue = expenses.reduce((total, expense) => total + expense.value, 0);
      transactions = expenses.length;

      // Calcul des statistiques par sous-catégorie
      expenses.forEach((expense) => {
        const subCategoryId = expense.subCategory?.id ?? 0; // Si la sous-catégorie est nulle, utiliser 0
        const subCategoryName = expense.subCategory?.name ?? "Uncategorized"; // Si le nom de la sous-catégorie est nul, utiliser "Uncategorized"
        if (!subCategoryStats[subCategoryName]) {
          subCategoryStats[subCategoryName] = { subCategoryId, totalValue: 0, transactions: 0 };
        }
        subCategoryStats[subCategoryName].totalValue += expense.value;
        subCategoryStats[subCategoryName].transactions += 1;
      });
    }

    // Calcul de la moyenne des dépenses journalières
    const averageDaily= totalValue / 7;
    const categoryName = expenses[0]?.category?.name ?? "Unknown"; // Si le nom de la catégorie est nul, utiliser "Unknown"

        return {
          categoryId,
          categoryName,
          totalValue,
          transactions,
          averageDaily,
          subCategoryStats,
        };
      } catch (error) {
        throw new Error("Failed to retrieve category stats for the week");
      }
    }
  
}
