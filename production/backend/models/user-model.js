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
        username:   { type: String, require: false },
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

module.exports = mongoose.model('User', users);