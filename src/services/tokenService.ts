import prisma from "@@prisma/prisma";

import { Request, Response } from "express";

import { UsersInterface } from "../interfaces/Users";
import { UnimplementedError} from "../exceptions/UnimplementedError";
import { isMain } from "./helperService";
export class TokenClass{

    // async getAllUsers() : Promise<Tokens[]> {
    //     //const tokens: Tokens[] = await prisma.tokens.findMany()

    //     //return tokens;
    // }

    getOneUser = (req: Request, res: Response) : UsersInterface | undefined =>{
        throw new UnimplementedError();
    }

    createNewUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }

    updateOneUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }

    deleteOneUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }
};

if (isMain()) {
    const tokenClass: TokenClass = new TokenClass();
}