import { FrequenciesInterface } from "./Frequencies";
import { CategoriesInterface } from "./Categories";
import { SubCategoriesInterface } from "./SubCategories";

export interface BudgetLinesInterface {
  id: number;
  userId: number;
  value: number;
  title: string;
  description: string | null;
  date: Date;
  type: string;
  frequencyId: number | null;
  categoryId: number;
  subCategoryId: number | null;
  updateDate: Date;
  creationDate: Date;
  frequency: FrequenciesInterface;
  category: CategoriesInterface;
  subCategory: SubCategoriesInterface;
}
