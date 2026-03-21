require("dotenv").config();
const express = require("express");
const app = express();

// Контролери
const userController = require("./controllers/user.controller");
const adController = require("./controllers/ad.controller");
const messageController = require("./controllers/message.controller");
const reviewController = require("./controllers/review.controller");
const favoriteController = require("./controllers/favorite.controller");
const categoryController = require("./controllers/category.controller"); // <- додано

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());

// Роутінг
app.use("/api/users", userController);
app.use("/api/ads", adController);
app.use("/api/messages", messageController);
app.use("/api/reviews", reviewController);
app.use("/api/favorites", favoriteController);
app.use("/api/categories", categoryController); // <- додано

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});