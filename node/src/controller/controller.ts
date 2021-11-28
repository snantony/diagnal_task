import fs from "fs";
import path from "path";

import { RequestHandler } from "express";

import rootPath from "../utils/path";

const getFile = (fileName: string) => {
  const filePath = path.join(rootPath, "data", "API", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const fetchContents: RequestHandler = (req, res, next) => {
  const data = getFile("CONTENTLISTINGPAGE-PAGE1.json");
  res.status(200).json({ message: data });
};
