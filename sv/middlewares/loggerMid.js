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
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.metadata(),
    format.timestamp(),
    format.printf(({ level, message, timestamp, metadata, req }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} 
      ${JSON.stringify(metadata)}`;
    })
  ),
});

export default logger;
