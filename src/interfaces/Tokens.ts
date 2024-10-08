import { UsersInterface } from "./Users";

export interface TokensInterface {
    id: number;
    token: string;
    userAgent: string;
    userId: number;
    user: UsersInterface;
};