const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/cse416";

mongoose.connect(url).then((ans) => {
    console.log("connect Success");
}).catch((err) => {
    console.log("Error");
});

const Schema = mongoose.Schema;
const users = new Schema({ 
    username:   { type: String, require: true },
    address:    { type: String, require: true },
    walletAddr: { type: Schema.Types.ObjectId, require: true },
    description: { type: String, require: false },
    pfp:        { type: String, require: false },
    created:    [{ type: Schema.Types.ObjectId, ref: 'tracks'}],
    collected:  [{ type: Schema.Types.ObjectId, ref: 'tracks'}],
    favorites:  [{ type: Schema.Types.ObjectId, ref: 'tracks'}],
    followers:  [{ type: Schema.Types.ObjectId, ref: 'users'}],
    following:  [{ type: Schema.Types.ObjectId, ref: 'users'}]
});

module.exports = mongoose.model('User', users);