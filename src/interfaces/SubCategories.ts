interface SubCategoriesInterface {
    id: number;
    name: string;
    iconId: number | null;
    color: string;
    creationDate: Date;
    updateDate: Date;
    parentId: number;
    userId: number;
    userGroupsId: number | null;
    parent: CategoriesInterface;
    icon: IconsInterface;
    user: UsersInterface;
    userGroups: UserGroupsInterface;
    alerts: AlertsInterface[];
    epargnes: EpargnesInterface[];
    groups: UserGroupsInterface[];
    BudgetLines: BudgetLinesInterface[];
};