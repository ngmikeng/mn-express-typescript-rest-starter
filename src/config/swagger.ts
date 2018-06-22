import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
const swaggerUi = require("swagger-ui-express");

module.exports = (app: Express) => {
  const swaggerJSDocOptions = {
    swaggerDefinition: {
      info: {
        title: "Express Rest API",
        version: "0.0.1",
      },
      basePath: "/api/v1/",
      securityDefinitions: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization"
        }
      },
      tags: [{
        name: "auth",
        description: "Everything about authentication",
      }, {
        name: "user",
        description: "Everything about user",
      }]
    },
    apis: ["./dist/routes/*.route.js"], // Path to the API docs
  };
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);
  // Swagger routers
  app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Serve swagger docs the way you like (Recommendation: swagger-tools)
  app.get("/api/v1/api-docs.json", function (req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
