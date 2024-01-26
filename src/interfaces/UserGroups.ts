import { CategoriesInterface } from "./Categories";
import { EpargnesInterface } from "./Epargnes";
import { SubCategoriesInterface } from "./SubCategories";
import { UsersInterface } from "./Users";

export interface UserGroupsInterface {
    id: number;
    title: string;
    ownerId: number;
    owner: UsersInterface;
    categories: CategoriesInterface[];
    SubCategories: SubCategoriesInterface[];
    epargnes: EpargnesInterface[];
    users: UsersInterface[];
};