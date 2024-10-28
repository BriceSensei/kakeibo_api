import { CategoriesInterface } from './Categories';
import { SubCategoriesInterface } from './SubCategories';
import { UserGroupsInterface } from './UserGroups';
import { UsersInterface } from './Users';

export interface EpargnesInterface {
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
    user: UsersInterface;
    category: CategoriesInterface;
    subcategory: SubCategoriesInterface;
    userGroups: UserGroupsInterface[];
};