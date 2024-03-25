import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", tweetSchema);

export default Post;
