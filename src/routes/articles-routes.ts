import { Router, type Request, type Response } from "express";
import { type ArticleWithUser } from "../interfaces/interfaces";
import { pool } from "../database";
import { authenticateToken } from "../middleware/auth-validation";
import { validateCreateArticle } from "../middleware/articles-validation";
import { ResultSetHeader } from "mysql2";

const router = Router();

//GET /articles
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
        articles.id,
        articles.title,
        articles.body,
        articles.category,
        articles.submitted_by,
        articles.created_at,
        users.email
      FROM articles
      INNER JOIN users ON articles.submitted_by = users.id
      ORDER BY articles.created_at DESC`
    );
    const articles = rows as ArticleWithUser[];
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// POST
router.post(
  "/",
  authenticateToken,
  validateCreateArticle,
  async (req: Request, res: Response) => {
    try {
      const { title, body, category } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
        [title, body, category, userId]
      );

      res.status(201).json({
        message: "Article created successfully",
        article: {
          id: result.insertId,
          title,
          body,
          category,
          submitted_by: userId,
        },
      });
    } catch (error) {
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Failed to create article" });
    }
  }
);

export default router;
