import fs from "fs-extra";

export default function apilog(req, res) {
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

  fs.appendFile("newLog.log", requestValues.join(" ") + "ms " + "\n");

  return res.json("Successfully exported the data");
}
