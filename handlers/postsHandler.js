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
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({
      error: "At least one field (title or content) is required to update",
    });
  }
  const updatedFields = [];
  const values = [];
  if (title) {
    updatedFields.push("title = ?");
    values.push(title);
  }
  if (content) {
    updatedFields.push("content = ?");
    values.push(content);
  }
  values.push(id);

  try {
    await db.query(
      `UPDATE posts SET ${updatedFields.join(", ")} WHERE id = ?`,
      values
    );
    return res.status(200).json({ success: "Post updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM posts WHERE id = ?", [id]);
    if (result.effectedRows === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
};
