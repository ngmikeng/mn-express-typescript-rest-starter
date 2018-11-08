import app from "./config/app";
import config from "./config/config";
import winstonLogger from "./config/winston";

// Server is listenning on port {config.port}
app.listen(config.port, () => {
  winstonLogger.info(`Server started on port ${config.port} (${config.env})`);
});

export default app;
