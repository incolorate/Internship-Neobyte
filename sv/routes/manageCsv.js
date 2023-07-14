import express from "express";
import fs from "fs-extra";
import { parse } from "csv-parse";
import Data from "../models/importSchema.js";

const router = express.Router();

router.post("/importtodb", async (req, res) => {
  const dataToPush = [];

  fs.createReadStream("./file.csv")
    .pipe(
      parse({
        delimiter: ",",
        from_line: 2,
        columns: [
          "Index",
          "Customer Id",
          "First Name",
          "Last Name",
          "Company",
          "City",
          "Country",
          "Phone 1",
          "Phone 2",
          "Email",
          "Subscription Date",
          "Website",
        ],
      })
    )
    .on("data", (row) => {
      const extractedData = {
        customerId: row["Customer Id"],
        firstName: row["First Name"],
        lastName: row["Last Name"],
        company: row["Company"],
        city: row["City"],
        country: row["Country"],
        phone: row["Phone 1"],
      };
      dataToPush.push(extractedData);
    })
    .on("end", async () => {
      const insertedData = await Data.create(dataToPush);
      res.status(200).json({ message: "Data imported successfully" });
    })
    .on("error", (error) => {
      reject(error);
    });
});
export default router;
