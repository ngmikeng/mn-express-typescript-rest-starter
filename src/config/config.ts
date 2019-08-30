import dotenv from "dotenv";
import Joi from "@hapi/joi";

dotenv.config();
// env config schema
const envConfigSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test"])
    .default("development"),
  PORT: Joi.number()
    .default(5000),
  JWT_SECRET: Joi.string().required()
    .description("JWT Secret required to sign"),
  ROOT_URL: Joi.string().default("http://localhost:5000/"),
  IS_USE_MONGO: Joi.boolean().default(true),
  MONGODB_URI: Joi.string().default("mongodb://localhost:27017/")
}).unknown()
.required();

const { error, value: envConfig } = Joi.validate(process.env, envConfigSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envConfig.NODE_ENV,
  port: envConfig.PORT,
  jwtSecret: envConfig.JWT_SECRET,
  rootUrl: envConfig.ROOT_URL,
  isUseMongo: envConfig.IS_USE_MONGO,
  mongodbUrl: envConfig.MONGODB_URI
};

export default config;
