import { CategoriesInterface } from "./Categories";
import { SubCategoriesInterface } from "./SubCategories";

export interface IconsInterface {
    id: number;
    iconName: string;
    svgPath: string;
    categories: CategoriesInterface[];
    SubCategories: SubCategoriesInterface[];
};