import express from "express";
import "dotenv/config";
import postsRouter from "./routes/postsRouter.js";

const port = process.env.PORT || 3300;

const app = express();
app.use(express.json());

app.get("/api", (rea, res) => {
  res.status(200).json({ message: "OK" });
});
app.use("/api/posts/", postsRouter);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
