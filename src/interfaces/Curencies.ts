import { UsersInterface } from "./Users";

export interface CurenciesInterface {
    id: number;
    name: string;
    devise: string;
    Users: UsersInterface[];
};