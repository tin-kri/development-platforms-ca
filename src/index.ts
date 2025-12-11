import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users-routes";
import articleRoutes from "./routes/articles-routes";
import authRoutes from "./routes/auth-routes";
import { notFoundHandler, errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

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
