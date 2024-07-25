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
 *      summary: Modify one budgetLine
 *      tags: [BudgetLines]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the budgetLine
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/budgetLineRoute'
 *      responses:
 *        "204":
 *          description: Budget line updated successfully
 *          content:
 *            application/json: {}
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
budgetLineRoute.patch("/:id", authentificateToken, budgetLineController.updateOneBudgetLine);

/**
 * @swagger
 *  /budgetLines/{id}:
 *    delete:
 *      summary: delete one budgetLine
 *      tags: [BudgetLines]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the budgetLine
 *      responses:
 *        "204":
 *          description: Budget line deleted successfully
 *          content:
 *            application/json: {}
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
budgetLineRoute.delete("/:id", budgetLineController.deleteOneBudgebudgetLine);

/**
 * @swagger
 *  /budgetlines/expenses/annual:
 *    get:
 *      summary: Get annual expenses
 *      tags: [BudgetLines]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          required: true
 *          description: Year for which to retrieve expenses
 *      responses:
 *        "200":
 *          description: Annual expenses retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve annual expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve annual expenses
 */
budgetLineRoute.get(
  "/expenses/annual",
  authentificateToken,
  budgetLineController.getAnnualExpenses
);

/**
 * @swagger
 *  /budgetlines/expenses/monthly:
 *    get:
 *      summary: Get monthly expenses
 *      tags: [BudgetLines]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          required: true
 *          description: Year for which to retrieve expenses
 *        - in: query
 *          name: month
 *          schema:
 *            type: integer
 *          required: true
 *          description: Month for which to retrieve expenses (1-12)
 *      responses:
 *        "200":
 *          description: Monthly expenses retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve monthly expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve monthly expenses
 */
budgetLineRoute.get(
  "/expenses/monthly",
  authentificateToken,
  budgetLineController.getMonthlyExpenses
);

/**
 * @swagger
 *  /budgetlines/expenses/weekly:
 *    get:
 *      summary: Get weekly expenses
 *      tags: [BudgetLines]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          required: true
 *          description: Year for which to retrieve expenses
 *        - in: query
 *          name: month
 *          schema:
 *            type: integer
 *          required: true
 *          description: Month for which to retrieve expenses (1-12)
 *        - in: query
 *          name: week
 *          schema:
 *            type: integer
 *          required: true
 *          description: Week for which to retrieve expenses
 *      responses:
 *        "200":
 *          description: weekly expenses retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve weekly expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve weekly expenses
 */
budgetLineRoute.get(
  "/expenses/weekly",
  authentificateToken,
  budgetLineController.getWeeklyExpenses
);



/**
 * @swagger
 *  /budgetlines/expenses/category/{categoryId}/current-month:
 *    get:
 *      summary: Get current month expenses for the specified category
 *      tags: [BudgetLines]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: true
 *          description: ID of the category
 *      responses:
 *        "200":
 *          description: Current month expenses retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve monthly expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve monthly expenses by category
 */
budgetLineRoute.get(
  "/expenses/category/:categoryId/current-month",
  authentificateToken,
  budgetLineController.getMonthlyExpensesByCategory
);

/**
 * @swagger
 *  /budgetlines/expenses/category:
 *    get:
 *      summary: Get expenses for a specific month and category
 *      tags: [BudgetLines]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          required: true
 *          description: Year for which to retrieve expenses
 *        - in: query
 *          name: month
 *          schema:
 *            type: integer
 *          required: true
 *          description: Month for which to retrieve expenses
 *        - in: query
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Category ID for which to retrieve expenses
 *      responses:
 *        "200":
 *          description: Expenses retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/budgetLineRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve expenses for the selected month and category
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve expenses for the selected month and category
 */
budgetLineRoute.get(
  "/expenses/category",
  authentificateToken,
  budgetLineController.getExpensesByMonthAndCategory
);





//**************Dashboard***************///

/**
 * @swagger
 * tags:
 *    name: Dashboard
 *    description: API endpoints to manage dashboard
 */

/**
 * @swagger
 *  /budgetlines/expenses/weekly/statsOne:
 *    get:
 *      summary: Get weekly expenses statistics for the authenticated user
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: Weekly expenses statistics retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalExpenses:
 *                    type: number
 *                    description: Total expenses for the week
 *                  numberOfTransactions:
 *                    type: integer
 *                    description: Number of transactions for the week
 *                  averageDailyExpenses:
 *                    type: number
 *                    description: Average daily expenses for the week
 *                  expenses:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        value:
 *                          type: number
 *                        categoryId:
 *                          type: integer
 *                        categoryName:
 *                          type: string
 *                  categoryStats:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      properties:
 *                        categoryId:
 *                          type: integer
 *                        totalValue:
 *                          type: number
 *                        transactions:
 *                          type: integer
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve weekly expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve weekly expenses
 */
budgetLineRoute.get(
  "/expenses/weekly/statsOne",
  authentificateToken,
  budgetLineController.getWeeklyExpensesStatsOne
);

/**
 * @swagger
 *  /budgetlines/expenses/monthly/statsOne:
 *    get:
 *      summary: Get monthly expenses statistics for the authenticated user
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: Monthly expenses statistics retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalExpenses:
 *                    type: number
 *                    description: Total expenses for the month
 *                  numberOfTransactions:
 *                    type: integer
 *                    description: Number of transactions for the month
 *                  averageDailyExpenses:
 *                    type: number
 *                    description: Average daily expenses for the month
 *                  expenses:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        value:
 *                          type: number
 *                        categoryId:
 *                          type: integer
 *                        categoryName:
 *                          type: string
 *                  categoryStats:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      properties:
 *                        categoryId:
 *                          type: integer
 *                        totalValue:
 *                          type: number
 *                        transactions:
 *                          type: integer
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve monthly expenses
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve monthly expenses
 */
budgetLineRoute.get(
  "/expenses/monthly/statsOne",
  authentificateToken,
  budgetLineController.getMonthlyExpensesStatsOne
);

/**
 * @swagger
 *  /budgetlines/expenses/weekly/CategoryStatsWeek/{categoryId}:
 *    get:
 *      summary: Get weekly expense statistics for a specific category
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: true
 *          description: The ID of the category to retrieve statistics for
 *      responses:
 *        "200":
 *          description: Weekly expense statistics retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  categoryId:
 *                    type: integer
 *                  categoryName:
 *                    type: string
 *                  totalValue:
 *                    type: number
 *                  transactions:
 *                    type: integer
 *                  averageDaily:
 *                    type: number
 *                  subCategoryStats:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      properties:
 *                        subCategoryId:
 *                          type: integer
 *                        totalValue:
 *                          type: number
 *                        transactions:
 *                          type: integer
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve category stats for week
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve category stats for week
 */
budgetLineRoute.get(
  "/expenses/weekly/CategoryStatsWeek/:categoryId",
  authentificateToken,
  budgetLineController.getCategoryStatsForWeek
);

/**
 * @swagger
 *  /budgetlines/expenses/monthly/CategoryStatsMonth/{categoryId}:
 *    get:
 *      summary: Get monthly expense statistics for a specific category
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: true
 *          description: The ID of the category to retrieve statistics for
 *      responses:
 *        "200":
 *          description: Monthly expense statistics retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  categoryId:
 *                    type: integer
 *                  categoryName:
 *                    type: string
 *                  totalValue:
 *                    type: number
 *                  transactions:
 *                    type: integer
 *                  averageDaily:
 *                    type: number
 *                  subCategoryStats:
 *                    type: object
 *                    additionalProperties:
 *                      type: object
 *                      properties:
 *                        subCategoryId:
 *                          type: integer
 *                        totalValue:
 *                          type: number
 *                        transactions:
 *                          type: integer
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve category stats for month
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve category stats for month
 */
budgetLineRoute.get(
  "/expenses/monthly/CategoryStatsMonth/:categoryId",
  authentificateToken,
  budgetLineController.getCategoryStatsForMonth
);

/**
 * @swagger
 *  /budgetlines/expenses/weekly/BudgetLineHistoryCurrentWeek:
 *    get:
 *      summary: Get budget line history for the current week
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: false
 *          description: The ID of the category to filter by
 *        - in: query
 *          name: subCategoryId
 *          schema:
 *            type: integer
 *          required: false
 *          description: The ID of the subcategory to filter by
 *      responses:
 *        "200":
 *          description: Budget line history for the current week retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  budgetLines:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        userId:
 *                          type: integer
 *                        value:
 *                          type: number
 *                        title:
 *                          type: string
 *                        description:
 *                          type: string
 *                        date:
 *                          type: string
 *                          format: date
 *                        type:
 *                          type: string
 *                        frequencyId:
 *                          type: integer
 *                        categoryId:
 *                          type: integer
 *                        subCategoryId:
 *                          type: integer
 *                  totalValue:
 *                    type: number
 *                  numberOfTransactions:
 *                    type: integer
 *                  averageDailyExpenses:
 *                    type: number
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve budget lines
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve budget lines
 */
budgetLineRoute.get(
  "/expenses/weekly/BudgetLineHistoryCurrentWeek",
  authentificateToken,
  budgetLineController.getBudgetLineHistoryCurrentWeek
);


/**
 * @swagger
 *  /budgetlines/expenses/monthly/BudgetLineHistoryCurrentMonth:
 *    get:
 *      summary: Get budget line history for the current month
 *      tags: [Dashboard]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: categoryId
 *          schema:
 *            type: integer
 *          required: false
 *          description: The ID of the category to filter by
 *        - in: query
 *          name: subCategoryId
 *          schema:
 *            type: integer
 *          required: false
 *          description: The ID of the subcategory to filter by
 *      responses:
 *        "200":
 *          description: Budget line history for the current month retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  budgetLines:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        userId:
 *                          type: integer
 *                        value:
 *                          type: number
 *                        title:
 *                          type: string
 *                        description:
 *                          type: string
 *                        date:
 *                          type: string
 *                          format: date
 *                        type:
 *                          type: string
 *                        frequencyId:
 *                          type: integer
 *                        categoryId:
 *                          type: integer
 *                        subCategoryId:
 *                          type: integer
 *                  totalValue:
 *                    type: number
 *                  numberOfTransactions:
 *                    type: integer
 *                  averageDailyExpenses:
 *                    type: number
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "500":
 *          description: Failed to retrieve budget lines
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Failed to retrieve budget lines
 */
budgetLineRoute.get(
  "/expenses/monthly/BudgetLineHistoryCurrentMonth",
  authentificateToken,
  budgetLineController.getBudgetLineHistoryCurrentMonth
);
///////////////////////////////////////////


export default budgetLineRoute;
