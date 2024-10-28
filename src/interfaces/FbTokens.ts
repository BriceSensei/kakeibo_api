import { UsersInterface } from './Users';

export interface FbTokensInterface {
    id: number;
    token: string;
    userAgent: string;
    userId: number;
    user: UsersInterface;
};