import express, { Router } from "express";
import { UserController } from "@controller/UserController";
import { authentificateToken } from "../middlewares/authentificateToken";
import { CheckUserRole } from "../middlewares/CheckUserRole";

const userRoute: Router = express.Router();
const userController: UserController = new UserController();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints to manage User
 */

/**
 * @swagger
 *  /users/register:
 *    post:
 *       summary: create a user
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userRoute'
 *             example:
 *                name: "Testy"
 *                firstName: "Quatre"
 *                lastName: "Quatre"               
 *                email: "testy.quatre@gmail.com"
 *                password: "12345678"
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
userRoute.post("/register", userController.register);

userRoute.use(authentificateToken);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: get all users
 *     tags: [User]
 *     security:
 *        - bearerAuth: []    
 *     responses:
 *       '200':
 *         description: the list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:   
 *                 $ref: '#/components/schemas/userRoute'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */
userRoute.get("/", CheckUserRole(13), userController.getAllUsers);

/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Get one user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user ID
 *      responses:
 *        "200":
 *          description: The user data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userRoute'
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
userRoute.get("/:id", userController.getUserById);


/**
 * @swagger
 *  /users/{id}:
 *    patch:
 *      summary: Modify a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userRoute'
 *      responses:
 *        "204":
 *          description: The user updated data successfully
 *          content:
 *            application/json: {}
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
userRoute.patch("/:id", userController.updateOneUser);


/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: Delete one user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id of the user
 *      responses:
 *        "204":
 *          description: User deleted successfully
 *          content:
 *            application/json: {}
 *        "400":
 *          $ref: '#/components/responses/400'
 *        "401":
 *          $ref: '#/components/responses/401'
 *        "404":
 *          $ref: '#/components/responses/404'
 */
userRoute.delete("/:id", userController.deleteOneUser);

export default userRoute;
