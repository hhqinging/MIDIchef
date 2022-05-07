import mongoose from 'mongoose';
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// const url = "mongodb://localhost:27017/cse416";
// mongoose.connect(url).then((ans) => {
//     console.log("connect Success");
// }).catch((err) => {
//     console.log("Error");
// });


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

//get user info by walletAddr
users.statics.findbyWallet = function(wa) {
    return (this.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

//get user created tracks by wallet
users.statics.getCreatedTracks = function(wa) {
    return (`${this.created}`.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

//get user collected tracks
users.statics.getCollectedTracks = function(wa) {
    return (`${this.collected}`.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

//get user favorites
users.statics.getFavoritedTracks = function(wa) {
    return (`${this.favorites}`.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

//get user followers
users.statics.getFollowers = function(wa) {
    return (`${this.followers}`.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

//get user following
users.statics.getFollowing = function(wa) {
    return (`${this.following}`.where({ walletAddr : new RegExp(wa, 'i')})).cast()
}

export default mongoose.model('User', users);