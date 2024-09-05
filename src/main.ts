import express from "express";
import swaggerUi from 'swagger-ui-express';
// import { specs } from './swagger';
import dotenv from "dotenv";
import promClient from "prom-client";
import mysql from 'mysql2';

import alertsRoute from '@route/AlertsRoute';
import budgetLineRoute from '@route/BudgetLineRoute';
import categoryRoute from '@route/CategoryRoute';
import epargnesRoute from '@route/EpargnesRoute';
import fbTokenRoute from '@route/FbTokenRoute';
import frequencyRoute from '@route/FrequencyRoute';
import groupsRoute from '@route/GroupsRoute';
import iconRoute from '@route/IconRoute';
import subCategoryRoute from '@route/SubCategoryRoute';
import tipsRoute from '@route/TipsRoute';
import tokenRoute from '@route/TokenRoute';
import userRoute from '@route/UserRoute';

dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;
const app = express();

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});

// Configure Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Create a counter for HTTP requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Create a histogram for HTTP request durations
const httpRequestDurationSeconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware to measure HTTP request duration and count
app.use((req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : 'unknown',
      status_code: res.statusCode,
    });
    end({ method: req.method, route: req.route ? req.route.path : 'unknown', status_code: res.statusCode });
  });
  next();
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/alerts', alertsRoute);
app.use('/category', budgetLineRoute);
app.use('/fbToken', categoryRoute);
app.use('/groups', epargnesRoute);
app.use('/subCategory', fbTokenRoute);
app.use('/token', frequencyRoute);
app.use('/budgetLine', groupsRoute);
app.use('/epargnes', iconRoute);
app.use('/frequency', subCategoryRoute);
app.use('/icon', tipsRoute);
app.use('/tips', tokenRoute);
app.use('/user', userRoute);

const port = parseInt(ENV.PORT ?? "8080");

// Modification de la ligne pour écouter sur toutes les interfaces réseau Brice
app.listen(port, '0.0.0.0', () => {
  console.log(`Hello! Server started on ${ENV.SCHEME??'http'}://0.0.0.0:${port}`);
});