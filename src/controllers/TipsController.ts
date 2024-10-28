import { Request, Response } from 'express';
import { TipsService } from '../services/tipsService';
import { Tips } from '@prisma/client';

export class TipsController {
  async getAllTips(req: Request, res: Response): Promise<void> {
    const allTips: TipsService = new TipsService();
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const order = (req.query.order as 'asc' | 'desc') || 'asc';
    const begin = req.query.begin
      ? new Date(req.query.begin as string)
      : undefined;
    try {
      const tips: Tips[] = await allTips.getAllTips(limit, order, begin);
      res.json(tips);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: 'Fail to get all tips',
      };

      res.status(500).send(errMsg);
    }
  }

  async getTipById(req: Request, res: Response): Promise<void> {
    const tipMethod: TipsService = new TipsService();
    const tipId: number = parseInt(req.params.id);

    try {
      const tip: Tips = await tipMethod.getOneTip(tipId);
      res.json(tip);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: 'Impossible de récuperer l'id d'un conseil',
      };
      res.status(500).send(errMsg);
    }
  }

  async createNewTip(req: Request, res: Response): Promise<void> {
    const tipMethod: TipsService = new TipsService();
    const tipData: Tips = { ...req.body };

    try {
      const tipLine: Tips = await tipMethod.createOneTip(tipData);
      res.json(tipLine);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: 'Echec leur de la creation d'un nouveau conseil',
      };
      res.status(500).send(errMsg);
    }
  }

  async updateOneTip(req: Request, res: Response): Promise<void> {
    const tipMethod: TipsService = new TipsService();
    const tipData: Tips = req.body;
    const tipId: number = parseInt(req.params.id);

    try {
      const tipUpdate: Tips = await tipMethod.updateTip(tipId, tipData);
      res.json(tipUpdate);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: 'Fail to update one advice',
      };
      res.status(500).send(errMsg);
    }
  }

  async deleteOneTip(req: Request, res: Response) {
    const tipMethod: TipsService = new TipsService();
    const tipId: number = parseInt(req.params.id);

    try {
      const tipDeleted: Tips = await tipMethod.deleteOneTip(tipId);
      res.json(tipDeleted);
    } catch (error) {
      const errMsg = {
        status: 500,
        error: error,
        message: 'Fail to delete tip in database',
      };
      res.status(500).send(errMsg);
    }
  }
}
