import { Router } from "express";
import parkings from "../parkings.json";

export const router = Router();

/**GET */
router.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(parkings));
});

router.get("/parking/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const parking = parkings.find((parking) => parking.id === id);
  if (parking) {
    res.status(200).json(parking);
  } else {
    res.status(404).send("il n'y pas de parking avec l'id: " + id);
  }
});
