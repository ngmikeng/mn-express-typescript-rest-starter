import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint, json, simple } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "App" }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    format: prettyPrint(),
  }));
}

export default logger;
