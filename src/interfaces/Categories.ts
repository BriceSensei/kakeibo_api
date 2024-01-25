interface Categories {
    id: number;
    name: string;
    iconId: number;
    color: string;
    creationDate: Date;
    updateDate: Date;

    icon: Icons;

    alerts: Alerts[];
    budgetLines: BudgetLines[];
    Epargnes: Epargnes[];
    SubCategories: SubCategories[];
}
;
