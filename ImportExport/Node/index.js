import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import fs from "fs-extra";
import Data from "./importSchema.js";
import { parse } from "csv-parse/.";

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());

// Routes
app.post("/import", async (req, res) => {
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

app.post("/export", async (req, res) => {
  const data = await Data.find();
  if (!data) {
    return res.json("There was an error when fetching the data");
  }

  const writableStream = fs.createWriteStream("new.csv");
  const headers = [
    "customerId",
    "firstName",
    "lastName",
    "company",
    "city",
    "country",
    "phone",
  ];

  writableStream.write(headers.join(",") + "\n");
  // Write the headers to the file
  data.forEach((row) => {
    const rowData = headers.map((header) => row[header]);
    writableStream.write(rowData.join(",") + "\n");
  });
  return res.json("successfully exported the data");
});

// Connect to db
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Some error occurred ", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
