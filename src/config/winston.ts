import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, simple } = format;

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "App" }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    simple(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message} ${info.level === "error" ? JSON.stringify(info.error) : ""}`)
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
