import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const users = new Schema(
    { 
        username:   { type: String, require: false, default: "GUEST"},
        description: { type: String, require: false },
        pfp:        { type: String, require: false },
        walletAddr: { type: String, require: true },
        created:    [{ type: Number, required: false }],
        collected:  [{ type: Number, required: false }],
        favorites:  [{ type: Number, required: false }],
        followers:  [{ type: Number, required: false }],
        following:  [{ type: Number, required: false }]
    },
    { timestamps: true },
);


export default mongoose.model('User', users);