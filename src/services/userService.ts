import { Request, Response } from "express";
import { UsersInterface } from "../interfaces/Users";

class UserClass{

    constructor(){

    }

     getAllUsers = (req: Request, res: Response) : void =>{
        //const allUsers 
        return;
    }

    getOneUser = (req: Request, res: Response) : UsersInterface | undefined =>{
        return;
    }

    createNewUser = (req: Request, res: Response) : void => {
        return;
    }

    updateOneUser = (req: Request, res: Response) : void => {
        return;
    }
}

export{UserClass};