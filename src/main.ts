import express from "express";
import swaggerUi from 'swagger-ui-express';
import { specs } from './Swagger';
import dotenv from "dotenv";


dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;
const app = express();
const port = parseInt(ENV.PORT ?? "3000");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server started on ${ENV.SCHEME??'http'}://127.0.01:${port}`);
});
