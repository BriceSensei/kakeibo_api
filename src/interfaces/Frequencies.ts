interface Frequencies {
    id: number;
    userId: number;
    startTime: Date;
    endTime: Date | null;
    type: string;
    days: string;

    user: Users;

    budgetLines: BudgetLines[];
}
;
