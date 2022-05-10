import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// const users = new Schema(
//     { 
//         username:   { type: String, require: false, default: "GUEST"},
//         description: { type: String, require: false },
//         pfp:        { type: String, require: false },
//         walletAddr: { type: String, require: true },
//         created:    [{ type: Number, required: false }],
//         collected:  [{ type: Number, required: false }],
//         favorites:  [{ type: Number, required: false }],
//         followers:  [{ type: Number, required: false }],
//         following:  [{ type: Number, required: false }]
//     },
//     { timestamps: true },
// );

const User = new mongoose.Schema(
    {
      userName: { type: String, default:"GUEST" },
      profilePhoto: {type: String, default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      userAlgoAddress: { type: String },
      description:     { type: String },
      walletAddr:      { type: String },
      isFollowing:     { type: Boolean, default: false },
      isUnFollowing:   { type: Boolean, default: false },
    //   jwtToken:        { type: String },
    //   jwtTokenExpires: { type: String },
      viewedBy:        { 
          type: [{
            type: ObjectId,
            ref: "User",
          }]
      },
  
      followers: {
        type: [{
            type: ObjectId,
            ref: "User",
          }]
      },
  
      following: {
        type: [{
            type: ObjectId,
            ref: "User",
          }]
      },
    },
  
    {timestamps: true}
  );
export default mongoose.model('User', User);