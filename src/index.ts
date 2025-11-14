import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load .env file
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000; // Use env var or default to 3000

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// other routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});