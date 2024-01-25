interface BudgetLines {
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

    frequency: Frequencies;
    category: Categories;
    subCategory: SubCategories;
}
;
