interface UserGroups {
    id: number;
    title: string;
    ownerId: number;

    owner: Users;

    categories: Categories[];
    SubCategories: SubCategories[];
    epargnes: Epargnes[];
    users: Users[];
}
;
