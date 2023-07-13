import { createLogger, format, transports } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      level: "warn",
      filename: "warningLogs.log",
    }),
    new transports.File({
      level: "error",
      filename: "errorLogs.log",
    }),
    new transports.File({
      filename: "api.log",
      level: "silly",
    }),
  ],
  //   modifica formatul de return
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.metadata(),
    format.timestamp()
  ),
});

export default logger;
