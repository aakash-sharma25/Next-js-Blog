const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    avatar: {
      type: String,
      required: [true, "avatar is required"],
    },
    posts:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"posts"
    }],

  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;