import express, { Request, Response, Router } from "express";
import { UnimplementedError } from "../exceptions/UnimplementedError";
import { BudgetLineController } from "@controller/BudgetLineController";

import { authentificateToken } from "../middlewares/authentificateToken";

const budgetLineRoute: Router = express.Router();
const budgetLineController: BudgetLineController = new BudgetLineController();


/**
 * @swagger
 * tags:
 *    name: BudgetLines
 *    description: API endpoints to manage BudgetLines
 */

/**
 * @swagger
 *  /budgetlines:
 *    post:
 *       summary: create a budgetLine
 *       tags: [BudgetLines]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/budgetLineRoute'
 *             example:
 *                userId: 72
 *                value: 150.50
 *                title: "Grocery Shopping"               
 *                type: "outcome/income"
 *                categoryId: 3
 *       responses:
 *          "201":
 *             description: Budget line created successfully
 *             contents:
 *               application/json
 *          "400":
 *             $ref: '#/components/responses/400'
 *          "401":
 *             $ref: '#/components/responses/401'
 */
budgetLineRoute.post("/", budgetLineController.createNewBudgetLine);

/**
 * @swagger
 *  /budgetlines:
 *    get:
 *       summary: Get all budgetLines
 *       tags: [BudgetLines]
 *       security:
 *          - bearerAuth: []
 *       parameters:
 *         - $ref: '#/components/parameters/limit'
 *         - $ref: '#/components/parameters/order'
 *         - $ref: '#/components/parameters/begin'
 *       responses:
*          "200":
*            description: The list of all BudgetLines
*            contents:
*              application/json:
*                schema:
*                  type: array
*                  items: 
*                    $ref: '#/components/schemas/budgetLineRoute'                
*          "400":
*             $ref: '#/components/responses/400'
*          "401":
*             $ref: '#/components/responses/401'
* 
*/
budgetLineRoute.get("/", authentificateToken ,budgetLineController.getAllBudgetLines.bind(budgetLineController)
);

/**
 * @swagger
 *  /budgetLines/{id}:
 *    get:
 *      summary: Get one budgetLine
 *      tags: [BudgetLines]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The budgetline ID
 *      responses:
 *        "200":
 *          description: The budget line data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
budgetLineRoute.get("/:id", authentificateToken, budgetLineController.getBudgetLineById);

/**
 * @swagger
 *  /budgetLines/{id}:
 *    patch:
 *      summary: modify one budgetLine
 *      tags: [BudgetLines]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The budgetline ID
  *      requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/budgetLineRoute'              
 *      responses:
 *        "204":
 *          description: budgetline updated successfully
 *          content:
 *            application/json:
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
budgetLineRoute.patch("/:id", authentificateToken, budgetLineController.updateOneBudgetLine);




budgetLineRoute.delete("/:id", budgetLineController.deleteOneBudgebudgetLine);

budgetLineRoute.get(
  "/expenses/annual",
  authentificateToken,
  budgetLineController.getAnnualExpenses
);
budgetLineRoute.get(
  "/expenses/monthly",
  authentificateToken,
  budgetLineController.getMonthlyExpenses
);

budgetLineRoute.get(
  "/expenses/weekly",
  authentificateToken,
  budgetLineController.getWeeklyExpenses
);

//**************Dashboard***************///

budgetLineRoute.get(
  "/expenses/weekly/statsOne",
  authentificateToken,
  budgetLineController.getWeeklyExpensesStatsOne
);

budgetLineRoute.get(
  "/expenses/monthly/statsOne",
  authentificateToken,
  budgetLineController.getMonthlyExpensesStatsOne
);

budgetLineRoute.get(
  "/expenses/weekly/CategoryStatsWeek/:categoryId",
  authentificateToken,
  budgetLineController.getCategoryStatsForWeek
);

budgetLineRoute.get(
  "/expenses/weekly/CategoryStatsMonth/:categoryId",
  authentificateToken,
  budgetLineController.getCategoryStatsForMonth
);

budgetLineRoute.get(
  "/expenses/weekly/BudgetLineHistoryCurrentWeek",
  authentificateToken,
  budgetLineController.getBudgetLineHistoryCurrentWeek
);

budgetLineRoute.get(
  "/expenses/weekly/BudgetLineHistoryCurrentMonth",
  authentificateToken,
  budgetLineController.getBudgetLineHistoryCurrentMonth
);
///////////////////////////////////////////

budgetLineRoute.get(
  "/expenses/category/:categoryId/current-month",
  authentificateToken,
  budgetLineController.getMonthlyExpensesByCategory
);

budgetLineRoute.get(
  "/expenses/category",
  authentificateToken,
  budgetLineController.getExpensesByMonthAndCategory
);





/****************** SWAGGER **************/



export default budgetLineRoute;
