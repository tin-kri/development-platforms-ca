import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./database";
import userRoutes from "./routes/users-routes";
import articleRoutes from "./routes/articles-routes";
import authRoutes from "./routes/auth-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);
// app.get("/", (req, res) => {
//   res.json({ message: "Hello world!" });
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
