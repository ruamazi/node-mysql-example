import { db } from "../db.js";

export const getAllPosts = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM posts");
    return res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostByID = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are requireds" });
  }
  await db.query(
    `INSERT INTO posts (title, content)
    VALUES (?,?)
    `,
    [title, content]
  );
  return res.status(201).json({ success: "Post created successfully" });
};

export const updatePost = async (req, res) => {
  console.log("update one");
};
export const deletePost = async (req, res) => {
  console.log("delete one");
};
