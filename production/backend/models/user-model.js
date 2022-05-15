import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const User = new mongoose.Schema(
    {
      userName: { type: String, default:"GUEST" },
      profilePhoto: {type: String, default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      userAlgoAddress: { type: String },
      description:     { type: String },
      walletAddr:      { type: String },
	owned: [Number]
		
	    },
  
    {timestamps: true}
  );
export default mongoose.model('User', User);