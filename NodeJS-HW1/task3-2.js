import fs from "fs";
import csv from "csvtojson";

const readstream = fs.createReadStream("./data.csv", "utf-8");
const writeStream = fs.createWriteStream("./data.txt");

readstream
  .pipe(csv())
  .on("error", (error) => console.error(error))
  .pipe(writeStream)
  .on("error", (error) => console.error(error));
