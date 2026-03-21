const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "C2C Marketplace API",
      version: "1.0.0"
    },
    servers: [
      { url: "http://localhost:3000" }
    ]
  },
  apis: ["./src/controllers/*.js"]
};

module.exports = swaggerJsdoc(options);