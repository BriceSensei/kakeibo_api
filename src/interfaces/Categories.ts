export interface CategoriesInterface {
    id: number;
    name: string;
    iconId: number;
    color: string;
    creationDate: Date;
    updateDate: Date;
    icon: IconsInterface;
    alerts: AlertsInterface[];
    budgetLines: BudgetLinesInterface[];
    Epargnes: EpargnesInterface[];
    SubCategories: SubCategoriesInterface[];
};