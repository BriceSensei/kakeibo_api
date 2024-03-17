import express from "express";
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import dotenv from "dotenv";
import bodyParser from "body-parser";

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json())

app.use('/alerts', alertsRoute);
app.use('/category', categoryRoute);
app.use('/fbToken', categoryRoute);
app.use('/groups', epargnesRoute);
app.use('/subCategory', fbTokenRoute);
app.use('/token', frequencyRoute);
app.use('/budgetLine', budgetLineRoute);
app.use('/epargnes', iconRoute);
app.use('/frequency', subCategoryRoute);
app.use('/icon', tipsRoute);
app.use('/tips', tipsRoute);
app.use('/user', userRoute);

const port = parseInt(ENV.PORT ?? "3000");

app.listen(port, () => {
  console.log(`Server started on ${ENV.SCHEME??'http'}://127.0.0.1:${port}`);
});
