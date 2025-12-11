import { Router, type Request, type Response } from "express";
import { type ArticleWithUser } from "../interfaces/interfaces";
import { pool } from "../database";
import { authenticateToken } from "../middleware/auth-validation";
import { validateCreateArticle } from "../middleware/articles-validation";
import { ResultSetHeader } from "mysql2";

const router = Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve all articles with author information (public access)
 *     responses:
 *       200:
 *         description: List of all articles with author email
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     description: Submit a new article (requires authentication with JWT token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: Article title (3-255 characters)
 *                 example: How AI Is Affecting Music
 *               body:
 *                 type: string
 *                 description: Article content (minimum 10 characters)
 *                 example: Artificial intelligence has become a powerful force...
 *               category:
 *                 type: string
 *                 description: Article category (2-100 characters)
 *                 example: Music
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
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