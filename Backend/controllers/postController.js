import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

export const createPost = async (req, res) => {
  try {
    console.log("createPost is now running.");
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    await Post.create({ content: description, userID: id });
    console.log("Post created successfully.");
    return res.status(201).json({
      message: "Post created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    console.log("Deleted Post.");
    return res.status(200).json({
      message: "Post deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrUnlikePost = async (req, res) => {
  try {
    const postID = req.params.id;
    const loggedInUserID = req.body.id;

    if (!postID || !loggedInUserID) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(401).json({
        message: "Post does not exists.",
        success: false,
      });
    }
    if (post.likes.includes(loggedInUserID)) {
      // If already liked
      await Post.findByIdAndUpdate(postID, {
        $pull: { likes: loggedInUserID }, // Removing UserID from likes
      });
      await User.findByIdAndUpdate(loggedInUserID, {
        $pull: { likedPosts: postID }, // Removing postID from User's bookmarks
      });
      console.log("Removed liked successfully.");
      return res.status(200).json({
        message: "Post unliked successfully.",
        success: true,
      });
    } else {
      // If not liked
      await Post.findByIdAndUpdate(postID, {
        $push: { likes: loggedInUserID }, //Inserting UserID to likes
      });
      await User.findByIdAndUpdate(loggedInUserID, {
        $push: { likedPosts: postID }, //Inserting PostID to User's likes
      });
      console.log("Added liked successfully.");
      return res.status(200).json({
        message: "Post liked successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const bookmarkOrUnbookmarkPost = async (req, res) => {
  try {
    const postID = req.params.id;
    const loggedInUserID = req.body.id;

    if (!postID || !loggedInUserID) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(401).json({
        message: "Post does not exists.",
        success: false,
      });
    }
    if (post.bookmarks.includes(loggedInUserID)) {
      // If already bookmarked
      await Post.findByIdAndUpdate(postID, {
        $pull: { bookmarks: loggedInUserID }, // Removing UserID from bookmarks
      });

      await User.findByIdAndUpdate(loggedInUserID, {
        $pull: { bookmarkedPosts: postID }, // Removing postID from User's bookmarks
      });

      console.log("Removed bookmark successfully.");
      return res.status(200).json({
        message: "Post unbookmarked successfully.",
        success: true,
      });
    } else {
      // If not bookmarked
      await Post.findByIdAndUpdate(postID, {
        $push: { bookmarks: loggedInUserID }, //Inserting UserID to bookmarks
      });
      await User.findByIdAndUpdate(loggedInUserID, {
        $push: { bookmarkedPosts: postID }, //Inserting postID to User's bookmarks
      });
      console.log("Added bookmark successfully.");
      return res.status(200).json({
        message: "Post bookmarked successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
