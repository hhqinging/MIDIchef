// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
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
        walletAddr: { type: ObjectId, require: true },
        created:    [{ type: ObjectId, ref: 'Track', required: false }],
        collected:  [{ type: ObjectId, ref: 'Track', required: false }],
        favorites:  [{ type: ObjectId, ref: 'Track', required: false }],
        followers:  [{ type: ObjectId, ref: 'User', required: false }],
        following:  [{ type: ObjectId, ref: 'User', required: false }]
    },
    { timestamps: true },
);

//get user info by walletAddr
users.statics.findbyWallet = function(wa) {
    return this.where({ walletAddr : new RegExp(wa, 'i')})
}

//get user created tracks by wallet
users.statics.getCreatedTracks = function(wa) {
    return `${this.created}`.where({ walletAddr : new RegExp(wa, 'i')})
}

//get user collected tracks
users.statics.getCollectedTracks = function(wa) {
    return `${this.collected}`.where({ walletAddr : new RegExp(wa, 'i')})
}

//get user favorites
users.statics.getFavoritedTracks = function(wa) {
    return `${this.favorites}`.where({ walletAddr : new RegExp(wa, 'i')})
}

//get user followers
users.statics.getFollowers = function(wa) {
    return `${this.followers}`.where({ walletAddr : new RegExp(wa, 'i')})
}

//get user following
users.statics.getFollowing = function(wa) {
    return `${this.following}`.where({ walletAddr : new RegExp(wa, 'i')})
}

module.exports  = mongoose.model('User', users);