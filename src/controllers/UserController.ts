import { Users } from "@prisma/client";
import { UserService } from '../services/userService';
import { Request, Response } from "express";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const allUser: UserService = new UserService();
    try {
      const users: Users[] = await allUser.getAllUsers();
      res.json(users);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "impossible de récuperer la liste des users",
      };
      res.status(500).send(errMsg);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userMethod: UserService = new UserService();
    const userId: number = parseInt(req.params.id);

    try {
      const users: Users = await userMethod.getOneUser(userId);
      res.json(users);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to fetch user id",
      };
      res.status(500).send(errMsg);
    }
  }

  async createNewUser(req: Request, res: Response): Promise<void> {
    const userMethod: UserService = new UserService();
    const userData: Users = { ...req.body };
    try {
      const user: Users = await userMethod.createNewUser(userData);
      res.json(user);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to create new user",
      };
      res.status(500).send(errMsg);
    }
  }

  async updateOneUser(req: Request, res: Response): Promise<void> {
    const userMethod: UserService = new UserService();
    const userData: Users = req.body;
    const userId: number = parseInt(req.params.id);

    try {
      //const hashUserPassword = await userMethod.hashPassword(userPassword);
      const userUpdate: Users = await userMethod.updateOneUser(
        userId,
        userData
      );
      res.json(userUpdate);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "fail to update user's data",
      };
      res.status(500).send(errMsg);
    }
  }

  async deleteOneUser(req: Request, res: Response) {
    const userMethod: UserService = new UserService();
    const userId: number = parseInt(req.params.id);

    try {
      const userDelete: Users = await userMethod.deleteOneUser(userId);
      res.json(userDelete);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: "Fail to delete user in database",
      };
      res.status(500).send(errMsg);
    }
  }

  async register(req: Request, res: Response) {
    const userMethod: UserService = new UserService();
    const userData: Users = { ...req.body };
    const required: string[] = ["name", "firstName", "lastName", "email", "password"]

    const missingFields = required.filter(field => { return !req.body[field]; })
    if (missingFields.length != 0) {
      return res.status(400).json({ status: 400, message: `Some fields are missing: ${missingFields.join(', ')}` });
    }

    try {
      const token: string = await userMethod.register(userData);
      res.status(201).send({ token: token });
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message

      const errMsg = {
        status: 500,
        error: message,
      };
      res.status(500).send(errMsg);
    }
  }

  async confirmEmail(req: Request, res: Response) {
    const { code } = req.body;
    const { token } = req.headers;

    if (typeof token !== 'string') {
      return res.status(403).send({ status: 403, message: 'Token must be unique' });
    } else if (token === undefined) {
      return res.status(403).send({ status: 403, message: 'No token provided' });
    } else if (code === undefined) {
      return res.status(403).send({ status: 403, message: 'No code provided' });
    }

    const userMethod: UserService = new UserService();

    try {
      await userMethod.confirmEmail(token, code)
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message

      return res.status(403).send({ status: 403, message: message });

    }

    res.status(500).send("In build");
  }
}
