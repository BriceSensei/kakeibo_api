import prisma from "@prisma/prisma";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./CheckUserRole";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export async function authentificateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  //extraction du token jwt depuis l'en-tête Authorization
  const token = authHeader && authHeader.split(" ")[1];
  //Si aucun token n'est fourni, renvoyer une réponse 401 Unauthorized
  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    //vérification et decodage du token jwt
    const decoded: any = jwt.verify(token, accessTokenSecret as string);
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.sendStatus(401);
    }
    // Attacher l'utilisateur à l'objet requête pour un accès ultérieur dans d'autres middlewares
    req.user = user;

    //appel au middleware suivant
    next();
  } catch (error) {
    return res.sendStatus(403).json({
      error: true,
      message: "Authentification error",
    });
  }
}
