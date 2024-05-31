
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const authMethod: AuthService = new AuthService();
    const userMethod: UserService = new UserService();
    const { email, password } = req.body;

    try {
      const user = await userMethod.getUserByEmail(email);
      if (!user || !password) {
        res.status(404).json({ message: "Email and password are required" });
        return;
      }
      //validation mdp
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log(isValidPassword);
      if (!isValidPassword) {
        res.status(401).json({ message: "incorrect password" });
        return;
      }

      //si l'authentification réussit, générer un token jwt et le renvoyer en réponse
      const token = authMethod.generateAccessToken(user);
      console.log(token);

        const authMethod : AuthService = new AuthService;
        const userMethod : UserService = new UserService;
        const {email, password, stayLoggedIn = false} = req.body;
        try{       

            const user = await userMethod.getUserByEmail(email);
            if(!user || !password){
                res.status(404).json({message: "Email and password are required"});
                return;
            }
            //validation mdp
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                res.status(401).json({message: "incorrect password"});
                return;
            }

            //si l'authentification réussit, générer un token et refresh token jwt et les renvoyer en réponse
            const accessToken = await authMethod.generateAccessToken(user,req, stayLoggedIn);
            res.status(200).json({accessToken});
 

        }catch(error){
            const errMsg = {
                status: 500,
                error: error,
                message: "Database connection failed."
            }
            res.status(500).send(errMsg);
        }
    };
}
