interface Alerts {
    id: number;
    title: string;
    seuil: number;
    description: string;
    type: string;
    userId: number;
    categoryId: number;
    subCategoriesId: number | null;
    budgetId: number;

    user: Users;
    category: Categories;
    subCategories: SubCategories;
}
;
