import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users-routes";
import articleRoutes from "./routes/articles-routes";
import authRoutes from "./routes/auth-routes";
import { notFoundHandler, errorHandler } from "./middleware/error-handler";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev platforms API",
      version: "1.0.0",
      description: "A simple API for managing users and posts",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//Middleware
app.use(cors());
app.use(express.json());


// API documentation endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

//Error handling
app.use(notFoundHandler);
app.use(errorHandler);

//Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
