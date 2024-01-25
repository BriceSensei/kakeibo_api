interface UserGroupsInterface {
    id: number;
    title: string;
    ownerId: number;
    owner: UsersInterface;
    categories: CategoriesInterface[];
    SubCategories: SubCategoriesInterface[];
    epargnes: EpargnesInterface[];
    users: UsersInterface[];
};