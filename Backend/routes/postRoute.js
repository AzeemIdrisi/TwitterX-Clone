import express from "express";
import isAuthenticated from "../config/auth.js";
import {
  bookmarkOrUnbookmarkPost,
  createPost,
  deletePost,
  allPosts,
  followingPosts,
  likeOrUnlikePost,
} from "../controllers/postController.js";

const router = express.Router();

// Here isAuthenticated is the middleware that checks first
// if the request maker is authorised to make the request
router.route("/create").post(isAuthenticated, createPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/like/:id").put(isAuthenticated, likeOrUnlikePost);
router.route("/bookmark/:id").put(isAuthenticated, bookmarkOrUnbookmarkPost);
router.route("/allPosts/:id").get(isAuthenticated, allPosts);
router.route("/followingPosts/:id").get(isAuthenticated, followingPosts);

export default router;
