import { BudgetLineClass } from "../services/budgetLineService";
import { Request, Response } from "express";
import { BudgetLines } from "@prisma/client";
import prisma from "@prisma/prisma";

export class BudgetLineController {

    // public async getBudgetLines(req: Request, res: Response) {
    //     const budgetLines = new BudgetLineClass();
    //     await budgetLines.getAllBudgetLine(req, res);
    //     //const result = await budgetLines.getOneBudgetLine(req, res);
    //     res.send("Get All budget !");
    // }

    public async getBudgetLines(req: Request, res: Response) {
        try {
            // Récupérer toutes les lignes de budget
            const budgetLines = await prisma.budgetLines.findMany();
            res.status(200).json(budgetLines);
        } catch (error) {
            console.error("Erreur lors de la récupération de toutes les lignes de budget :", error);
            res.status(500).json({ message: "Erreur lors de la récupération de toutes les lignes de budget" });
        }
    }

    public async getBudgetLineById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            // Récupérer une ligne de budget spécifique
            const budgetLine = await prisma.budgetLines.findUnique({
                where: { id: parseInt(id) }
            });
            if (!budgetLine) {
                res.status(404).json({ message: "Ligne de budget introuvable" });
                return;
            }
            res.status(200).json(budgetLine);
        } catch (error) {
            console.error("Erreur lors de la récupération de la ligne de budget :", error);
            res.status(500).json({ message: "Erreur lors de la récupération de la ligne de budget" });
        }
    }

    public async createBudgetLine(req: Request, res: Response) {

        const budgetLineData = req.body;
        try {
            // Créer une nouvelle ligne de budget
            const newBudgetLine = await prisma.budgetLines.create({
                data: budgetLineData
            });
            res.status(201).json(newBudgetLine);
        } catch (error) {
            // Gérer les erreurs
            console.error("Erreur lors de la création de la ligne de budget :", error);
            res.status(500).json({ message: "Erreur lors de la création de la ligne de budget" });
        }
    }

    public async updateBudgetLine(req: Request, res: Response) {
        const { id } = req.params;
        const updatedBudgetLineData = req.body;
        try {
            // Mettre à jour une ligne de budget spécifique
            const updatedBudgetLine = await prisma.budgetLines.update({
                where: { id: parseInt(id) },
                data: updatedBudgetLineData
            });
            res.status(200).json(updatedBudgetLine);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la ligne de budget :", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la ligne de budget" });
        }
    }

    public async deleteBudgetLine(req: Request, res: Response) {
        const { id } = req.params;
        try {
            // Supprimer une ligne de budget spécifique
            const deletedBudgetLine = await prisma.budgetLines.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json(deletedBudgetLine);
        } catch (error) {
            console.error("Erreur lors de la suppression de la ligne de budget :", error);
            res.status(500).json({ message: "Erreur lors de la suppression de la ligne de budget" });
        }
    }
}