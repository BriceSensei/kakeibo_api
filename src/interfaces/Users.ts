import { AlertsInterface } from './Alerts';
import { CurenciesInterface } from './Curencies';
import { EpargnesInterface } from './Epargnes';
import { FbTokensInterface } from './FbTokens';
import { FrequenciesInterface } from './Frequencies';
import { SubCategoriesInterface } from './SubCategories';
import { TokensInterface } from './Tokens';
import { UserGroupsInterface } from './UserGroups';

export interface UsersInterface {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  creationDate: Date;
  updateDate: Date;
  passwordUpdateDate: Date;
  lastLoginDate: Date;
  connectionAttempts: number;
  isActive: boolean;
  roleId: number;
  curencyId: number;
  curency: CurenciesInterface;
  tokens: TokensInterface[];
  fbTokens: FbTokensInterface[];
  alerts: AlertsInterface[];
  epargnes: EpargnesInterface[];
  frequancies: FrequenciesInterface[];
  subCategories: SubCategoriesInterface[];
  groups: UserGroupsInterface[];
}
