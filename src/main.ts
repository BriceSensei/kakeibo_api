import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import dotenv from "dotenv";
import promClient from "prom-client";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import alertsRoute from "@route/AlertsRoute";
import budgetLineRoute from "@route/BudgetLineRoute";
import categoryRoute from "@route/CategoryRoute";
import epargnesRoute from "@route/EpargnesRoute";
import fbTokenRoute from "@route/FbTokenRoute";
import frequencyRoute from "@route/FrequencyRoute";
import groupsRoute from "@route/GroupsRoute";
import iconRoute from "@route/IconRoute";
import subCategoryRoute from "@route/SubCategoryRoute";
import tipsRoute from "@route/TipsRoute";
import refreshTokenRoute from "@route/refreshTokenRoute";
import userRoute from "@route/UserRoute";
import loginRoute from "@routeloginRoute";
import registerRoute from "@routeRegisterRoute";
import helmet from "helmet";

dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;
const app = express();


// Configure Prometheus metrics
promClient.collectDefaultMetrics();

// Endpoint pour les métriques
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', promClient.register.contentType);
  try {
    const metrics = await promClient.register.metrics();
    res.end(metrics);
  } catch (error) {
    console.error('Error retrieving metrics:', error);
    res.status(500).end('Error retrieving metrics');
  }
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/alerts", alertsRoute);
app.use("/category", categoryRoute);
app.use("/fbToken", categoryRoute);
app.use("/groups", epargnesRoute);
app.use("/subCategory", subCategoryRoute);
app.use("/token", frequencyRoute);
app.use("/budgetLines", budgetLineRoute);
app.use("/epargnes", iconRoute);
app.use("/frequency", subCategoryRoute);
app.use("/icons", iconRoute);
app.use("/tips", tipsRoute);
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/token", refreshTokenRoute);
app.use("/register", registerRoute);


// const port = parseInt(ENV.PORT ?? "8080");
//const host = ENV.HOST ?? "localhost";

// // Modification de la ligne pour écouter sur toutes les interfaces réseau Brice
// app.listen(port, host, () => {
//   console.log(`Hello! Server started on ${ENV.SCHEME??'http'}://${host}:${port}`);
// });

// la ligne host fait planter le serveur, je l'ai commenté pour que le serveur fonctionne Brice

const port = parseInt(ENV.PORT ?? "8080");

// Modification de la ligne pour écouter sur toutes les interfaces réseau Brice
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Hello! Server started on ${ENV.SCHEME??'http'}://0.0.0.0:${port}`);
});


export { app, server };