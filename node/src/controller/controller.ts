import fs from "fs";
import path from "path";

import { RequestHandler } from "express";

import rootPath from "../utils/path";

type contentDataType = {
  name: string;
  ["poster-image"]: string;
};

const getFile = (fileName: string) => {
  const filePath = path.join(rootPath, "data", "API", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const fetchContents: RequestHandler = (req, res, next) => {
  const { pageNo } = req.params;
  let { q } = req.query;

  const data = getFile(`CONTENTLISTINGPAGE-PAGE${pageNo}.json`);

  if(q && typeof q === 'string'){
    const arrayCopy = [...data.page["content-items"].content];
    data.page["content-items"].content = arrayCopy.filter((item: contentDataType) => {
      console.log(q,item);
      return item.name.toLocaleLowerCase().startsWith(`${q}`.toLocaleLowerCase());
    });
  }
  res.status(200).json({ message: { data, pageNo, q } });
};
