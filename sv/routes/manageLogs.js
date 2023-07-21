import express from "express";
import fs from "fs-extra";
const router = express.Router();

router.post("/writelog", async (req, res) => {
  const requestData = req.body;

  const requestDataKeys = Object.keys(requestData);

  const requestValues = [];
  //   filter out the data key
  requestDataKeys.map((key) => {
    if (key !== "data") {
      requestValues.push(requestData[key]);
    }
  });

  console.log(requestValues);

  fs.appendFile(
    "newLog.log",
    requestValues + "ms " + req.method + " " + req.originalUrl + "\n"
  );

  return res.json("Successfully exported the data");
});

export default router;
