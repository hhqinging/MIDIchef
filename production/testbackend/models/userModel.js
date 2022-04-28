import mongoose from "mongoose";

//create user schema
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "User name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    userAlgoAddress: { type: String, required: true },
    bio: { type: String },
    role: {
      type: String,
      enum: ["Guest", "Creator"],
    },
    isVerified: { type: Boolean, default: false },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,

    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//compile schema into model
const User = mongoose.model("User", userSchema);
// module.exports = User;
export default User;
