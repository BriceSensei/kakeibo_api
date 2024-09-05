import express, { Request, Response, Router } from "express";
import { UnimplementedError } from "../exceptions/UnimplementedError";
import { TipsController } from "@controller/TipsController";
import { authentificateToken } from "../middlewares/authentificateToken";

const tipsRoute: Router = express.Router();
const tipsController: TipsController = new TipsController();

tipsRoute.post("/", authentificateToken, tipsController.createNewTip);
tipsRoute.get("/", authentificateToken, tipsController.getAllTips);
tipsRoute.get("/:id", authentificateToken, tipsController.getTipById);

// Get all alerts from user
tipsRoute.get("/user/:userId", (req: Request, res: Response): void => {
  throw new UnimplementedError();
});

tipsRoute.patch("/:id", tipsController.updateOneTip);
tipsRoute.delete("/:id", tipsController.deleteOneTip);

export default tipsRoute;
