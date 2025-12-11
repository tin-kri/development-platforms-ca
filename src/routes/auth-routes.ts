import { Router } from "express";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/auth-validation";
import { User, UserResponse } from "../interfaces/interfaces";
import { generateToken } from "../utils/jwt";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password (min 8 chars, must include uppercase, lowercase, number, special character)
 *                 example: SecurePass123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or validation failed
 *       500:
 *         description: Internal server error
 */
router.post("/register", validateRegistration, async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const existingUsers = rows as any[];

    if (existingUsers.length > 0) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const [result]: [ResultSetHeader, any] = await pool.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashPassword]
    );

    const userResponse: UserResponse = {
      id: result.insertId,
      email,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Failed to register user",
    });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and receive JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const users = rows as User[];

    if (users.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password_hash!);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
    };

    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Failed to log in",
    });
  }
});

export default router;
