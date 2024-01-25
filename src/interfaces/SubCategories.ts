interface SubCategories {
    id: number;
    name: string;
    iconId: number | null;
    color: string;
    creationDate: Date;
    updateDate: Date;
    parentId: number;
    userId: number;
    userGroupsId: number | null;

    parent: Categories;
    icon: Icons;
    user: Users;
    userGroups: UserGroups;

    alerts: Alerts[];
    epargnes: Epargnes[];
    groups: UserGroups[];
    BudgetLines: BudgetLines[];
}
;
