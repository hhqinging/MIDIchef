import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    userAlgoAddress: { type: String },
    userAlgoPass: { type: String },
    // isAlgoAddress:{ type: Boolean, default: false },
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

//---------------------------------------
//hash password
//---------------------------------------
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this);
  next();
});

//---------------------------------------
//check if the password is matched
//when user email is found, we have the method "isPasswordMatched",
//here pass the password from the body to this function to compare with the 
//---------------------------------------
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//compile schema into model
const User = mongoose.model("User", userSchema);
// module.exports = User;
export default User;
