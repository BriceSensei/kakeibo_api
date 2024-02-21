import { AlertsInterface } from "./Alerts";
import { BudgetLinesInterface } from "./BudgetLines";
import { CategoriesInterface } from "./Categories";
import { EpargnesInterface } from "./Epargnes";
import { IconsInterface } from "./Icons";
import { UserGroupsInterface } from "./UserGroups";
import { UsersInterface } from "./Users";

export interface SubCategoriesInterface {
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