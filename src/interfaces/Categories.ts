import { AlertsInterface } from './Alerts';
import { BudgetLinesInterface } from './BudgetLines';
import { EpargnesInterface } from './Epargnes';
import { IconsInterface } from './Icons';
import { SubCategoriesInterface } from './SubCategories';

export interface CategoriesInterface {
    id: number;
    name: string;
    iconId: number;
    color: string;
    creationDate: Date;
    updateDate: Date;
    icon: IconsInterface;
    alerts: AlertsInterface[];
    budgetLines: BudgetLinesInterface[];
    Epargnes: EpargnesInterface[];
    SubCategories: SubCategoriesInterface[];
};