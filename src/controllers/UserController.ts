import { UsersInterface } from "../interfaces/Users";
import { UserClass } from "../services/userService";
import { Request, Response } from "express";



const creationDateString = "26-01-2024";
const cds = new Date(creationDateString);



let users: UsersInterface[] = [
    {
        id: 1,
        name: 'Coconuts',
        firstName:'Bernard',
        lastName:'Tapis',
        email: "bernard.tapis@gmail.com", 
        password: "azerty",
        creationDate: cds,
        updateDate: cds,
        passwordUpdateDate: cds,
        lastLoginDate: cds,
        connectionAttempts: 0,
        isActive: false,
        role: 0,
        curencyId: 2,
    },
    {
        id: 2,
        name: 'Barbara',
        firstName:'Barbie',
        lastName:'Blonde',
        email: "barbie.barbara@gmail.com", 
        password: "azerty",
        creationDate: cds,
        updateDate: cds,
        passwordUpdateDate: cds,
        lastLoginDate: cds,
        connectionAttempts: 0,
        isActive: false,
        role: 0,
        curencyId: 2,
    },
];

export class UserController{
    
        getAllUsers(req:Request, res:Response): void{
        const allUser = new UserClass();
         allUser.getAllUsers(req, res);
         res.send("Get All users !");
        };

        getUserById(req: Request, res:Response){
            const IdUser = new UserClass();
            IdUser.getOneUser(req,res);
            res.send("Get user ID !");
        }

        createNewUser(req: Request, res:Response){
            const createUser = new UserClass();
            createUser.createNewUser(req,res);
            res.send("New user has been create !")
        }


    // static getUser(id:number): UsersInterface | undefined {
    //     return users.find(user => user.id === id);
    // };

    // static createUser(user: UsersInterface): void{
    //     users.push(user);
    // };

    // static patchUser(id: number, userData:Partial<UsersInterface>): void{        
    //     const user = users.find(user => user.id === id);
    //     Object.assign(user, userData);
    // }

    // static deleteUser(id: number): void{
    //     users = users.filter(user => user.id !== id);
    // }

}