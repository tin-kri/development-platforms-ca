import { Router } from "express";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/auth-validation";
import { User, UserResponse } from "../users/users-types";
import { generateToken } from "../utils/jwt";

//create router
const router = Router();

// post / register endpoint that handles registration

router.post("/register", validateRegistration, async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exist
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

    // inserts user into database
    const [result]: [ResultSetHeader, any] = await pool.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)", // password_hash column
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

//post /login endpoint that handles login

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
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

    // Compare password with hashed password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
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

//export the router

export default router;
