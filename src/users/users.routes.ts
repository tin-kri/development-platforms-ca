import { Router, type Request, type Response } from "express";
import { users } from "./users.data"
import { type User } from "./users.types";
import { pool } from "../database"
// import { checkAuth } from ../middleware/auth.middelware;

const router = Router();

//GET
router.get("/", async (req: Request, res, Response)=>{
    try{
        const [rows] = await pool.execute("select * from users");
        const users = rows as User[];
        res.json(users);
    }
    catch(error) {
        console.error("Error", error);
        res.status(500).json({error: "Failed to fetch users"});
    }
});