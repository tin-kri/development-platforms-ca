import { Router, type Request, type Response } from "express";
import { User } from "../interfaces/interfaces";
import { pool } from "../database";
// import { checkAuth } from ../middleware/auth.middleware;

const router = Router();

//GET USERS
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

//GET SINGLE USER
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const [rows] = await pool.execute("select * from users where id = ?", [
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

export default router;
