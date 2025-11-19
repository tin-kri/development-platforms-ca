import { Router, type Request, type Response } from "express";
import { type Article } from "./articles.types";
import { pool } from "../database";

const router = Router();

//GET ARTICLES 
//does not use //users.email as submitted_by//
//  //INNER JOIN users ON articles.submitted_by = users.id//
// when public unauth access
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
        articles.id,
        articles.title,
        articles.body,
        articles.category,
        articles.created_at
      FROM articles
      ORDER BY articles.created_at DESC`
    );
    const articles = rows as Article[];
    res.json(articles);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// POST ARTICLES - Protected (add later)
// router.post("/", checkAuth, async (req: Request, res: Response) => {
//   // Article logic
// });

export default router;
