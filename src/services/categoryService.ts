import prisma from '@@prisma/prisma';

import { Categories } from '@prisma/client';

export class CategoryService {
  constructor() {}

  /**
   * Get all categories from catgories table
   *
   * @returns Promise<Categories>
   */
  async getAllCategories(): Promise<Categories[]> {
    const allCategories: Categories[] = await prisma.categories.findMany();

    return allCategories;
  }

  /**
   * Get one budgetLine from BudgetLines table
   *
   * @param categoryId number
   *
   * @returns Promise<Categories>
   */
  async getOneCategory(categoryId: number): Promise<Categories> {
    const category: Categories = await prisma.categories.findUniqueOrThrow({
      where: { id: categoryId },
    });

    return category;
  }

  /**
   * Create a new category from categories table
   *
   * @param categoryData type Categories
   *
   * @returns Promise<Categories>
   */
  async createNewCategory(categoryData: Categories): Promise<Categories> {
    const category: Categories = await prisma.categories.create({
      data: {
        name: categoryData.name,
        iconId: categoryData.iconId,
        color: categoryData.color,
        creationDate: new Date(),
        updateDate: new Date(),
      },
    });
    return category;
  }

  /**
   *Updating the category corresponding to the entered ID parameter from categories table
   *
   * @param categoryId number
   * @param categoryData type Categories
   *
   * @returns Promise<Categories>
   */
  async updateOneCategory(
    categoryId: number,
    categoryData: Categories
  ): Promise<Categories> {
    const category: Categories = await prisma.categories.update({
      where: { id: categoryId },
      data: categoryData,
    });

    return category;
  }

  /**
   * Deleting the budget row corresponding to the entered ID parameter from budgetLines table
   *
   * @param categoryId number
   *
   * @returns category objet had been deleted
   */
  async deleteOneCategory(categoryId: number) {
    const category: Categories = await prisma.categories.delete({
      where: { id: categoryId },
    });

    return category;
  }
}
