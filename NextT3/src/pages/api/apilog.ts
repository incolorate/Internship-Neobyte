import fs from "fs-extra";

export default function apilog(req, res) {
  const requestData = req.body;

  fs.appendFile(
    "newLog.log",
    `[${requestData.currentDate}] ${requestData.status} ${requestData.statusText} response time: ${requestData.responseTime} ms` +
      "\n"
  );

  return res.json("Successfully exported the data");
}
