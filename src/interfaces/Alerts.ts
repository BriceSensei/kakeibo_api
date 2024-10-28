import { CategoriesInterface } from './Categories';
import { SubCategoriesInterface } from './SubCategories';
import { UsersInterface } from './Users';

export interface AlertsInterface {
    id: number;
    title: string;
    seuil: number;
    description: string;
    type: string;
    userId: number;
    categoryId: number;
    subCategoriesId: number | null;
    budgetId: number;
    user: UsersInterface;
    category: CategoriesInterface;
    subCategories: SubCategoriesInterface;
};