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
 * /users/register:
 *   post:
 *     summary: Create a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example: 
 *               name: "test"
 *               firstName: "Joe"
 *               lastName: "Doe"
 *               email: "joe.doe@gmail.com"
 *               password: "password"
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         description: Unauthorized
 *         $ref: '#/components/responses/Unauthorized'
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
 *                 $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request
 *         $ref: '#/components/responses/400'
 *       '401':
 *         description: Unauthorized
 *         $ref: '#/components/responses/401'
 */
userRoute.get("/", CheckUserRole(13), userController.getAllUsers);
userRoute.get("/:id", userController.getUserById);
userRoute.patch("/:id", userController.updateOneUser);
userRoute.delete("/:id", userController.deleteOneUser);

export default userRoute;
