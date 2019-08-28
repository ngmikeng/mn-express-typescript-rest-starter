import { createLogger, format, transports } from "winston";
import serializeError from "serialize-error";
const { combine, timestamp, label, simple } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "App" }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS"
    }),
    simple(),
    format.printf(info => {
      const logInfo = `${info.timestamp} ${info.level}: ${info.message}`;
      if (info.level === "error") {
        const serializedErr: Error = serializeError(info.error);
        const infoError = JSON.stringify(info.error);
        const errorStack = `${serializedErr.stack}`;
        return `${logInfo} ${infoError}\n${errorStack}`;
      }
      return logInfo;
    })
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ]
});

//
// If we're not in production then log to the `console`.
//
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  logger.add(new transports.Console());
}

export default logger;
