import app from './config/app';
import config from './config/config';

// Server is listenning on port {config.port}
app.listen(config.port, () => {
  console.info(`Server started on port ${config.port} (${config.env})`);
});
