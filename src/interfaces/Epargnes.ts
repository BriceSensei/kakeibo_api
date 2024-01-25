interface Epargnes {
    id: number;
    userId: number;
    value: number;
    title: string;
    description: string | null;
    creationDate: Date;
    updateDate: Date;
    beginDate: Date;
    endDate: Date;
    categoryId: number;
    subcategoryId: number | null;
    userGroupsId: number | null;

    user: Users;
    category: Categories;
    subcategory: SubCategories;
    userGroups: UserGroups[];
}
;
