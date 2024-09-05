
export interface subCategoryStats {
    subCategoryId: number;
    totalValue: number;
    transactions: number;

}

export interface CategoryStats{
    categoryId: number;
    categoryName: string;
    totalValue: number;
    transactions: number;
    averageDaily: number;
    subCategoryStats: Record<string, subCategoryStats>  
}