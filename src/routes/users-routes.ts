import { Router, type Request, type Response } from "express";
import { User, ArticleWithUser } from "../interfaces/interfaces";
import { pool } from "../database";
import { validateUserId } from "../middleware/user-validation";

const router = Router();

//GET users
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute("select * from users");
    const users = rows as User[];
    res.json(users);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//GET single user
router.get("/:id", validateUserId, async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    const [rows] = await pool.execute("SELECT * FROM users where id = ?", [
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

// GET articles by specific user
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
