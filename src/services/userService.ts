import { Request, Response } from "express";
import { UsersInterface } from "../interfaces/Users";
import { UnimplementedError} from "../exceptions/UnimplementedError";

class UserClass{

    constructor(){

    }

    getAllUsers = (req: Request, res: Response) : void =>{
        //const allUsers 
        throw new UnimplementedError();
    }

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
}

export{UserClass};