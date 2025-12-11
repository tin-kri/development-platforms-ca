import { Router } from "express";
import { User, ArticleWithUser } from "../interfaces/interfaces";
import { pool } from "../database";
import { validateUserId } from "../middleware/user-validation";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    const users = rows as User[];
    res.json(users);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User object
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", validateUserId, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const users = rows as User[];

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(users[0]);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

/**
 * @swagger
 * /users/{id}/articles:
 *   get:
 *     summary: Get articles by user ID
 *     description: Retrieve all articles submitted by a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose articles to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of articles by the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get("/:id/articles", validateUserId, async (req, res) => {
  try {
    const userId = Number(req.params.id);

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
      WHERE users.id = ?
      ORDER BY articles.created_at DESC`,
      [userId]
    );

    const articles = rows as ArticleWithUser[];
    res.json(articles);
  } catch (error) {
    console.error("Error fetching user articles:", error);
    res.status(500).json({ error: "Failed to fetch user articles" });
  }
});

export default router;
