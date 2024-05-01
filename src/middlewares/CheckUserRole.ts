import { Request, Response, NextFunction } from "express";
import { Users } from "@prisma/client";

// Définition d'une interface personnalisée pour l'objet de requête
export interface CustomRequest extends Request {
  // Utilisation de l'interface Users pour annoter le type de la propriété 'user'
  user?: Users;
}

export function CheckUserRole(roleId: number) {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user?.roleId !== roleId) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
}
