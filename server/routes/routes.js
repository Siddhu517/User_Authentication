import express from "express";

import { requireSignIn } from "../middleware/auth";

const router = express.Router();

import {
  Home,
  Login,
  Register,
  Dashboard,
  deleteUser,
} from "../controllers/auth";

router.get("/", Home);
router.post("/register", Register);
router.post("/login", Login);
router.get("/dashboard", Dashboard);
router.delete("/:id", deleteUser);

export default router;
