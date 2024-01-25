interface FrequenciesInterface {
    id: number;
    userId: number;
    startTime: Date;
    endTime: Date | null;
    type: string;
    days: string;
    user: UsersInterface;
    budgetLines: BudgetLinesInterface[];
};