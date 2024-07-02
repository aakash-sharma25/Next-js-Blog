const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required:true,
    },
    title: {
      type: String,
      reqired: true,
    },
    content: {
      type: String,
      reqired: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
