import express, { Request, Response, NextFunction } from "express";
import path from "path";

import bodyParser from "body-parser";

import routes from "./routes/routes";

const app = express();

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/contents", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "page not found" });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error });
});

app.listen(8080);
