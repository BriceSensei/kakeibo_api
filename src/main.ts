import express, { Request, Response } from "express";
import dotenv from "dotenv";
import parkings from "../parkings.json";

dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;

const app = express();

const port = parseInt(ENV.PORT ?? "3000");

/** Make routes here */


/**GET */
app.get('/parking', (req: Request, res: Response) =>{
  res.status(200).json(parkings);
});

app.get('/parking/:id', (req:Request, res: Response) =>{
  const id = parseInt(req.params.id);
  const parking = parkings.find(parking => parking.id === id);
  if(parking){
    res.status(200).json(parking)  
  }else{
    res.status(404).send("il n'y pas de parking avec l'id: " + id);
  }
})

/**POST */
app.post('/parking', (req:Request, res:Response) =>{
  const newParking = req.body;
})

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
