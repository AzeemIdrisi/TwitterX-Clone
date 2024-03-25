import express from "express";
import isAuthenticated from "../config/auth.js";
import {
  bookmarkOrUnbookmarkPost,
  createPost,
  deletePost,
  likeOrUnlikePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/like/:id").put(isAuthenticated, likeOrUnlikePost);
router.route("/bookmark/:id").put(isAuthenticated, bookmarkOrUnbookmarkPost);
export default router;
