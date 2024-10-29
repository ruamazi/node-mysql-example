import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostByID,
  updatePost,
} from "../handlers/postsHandler.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
