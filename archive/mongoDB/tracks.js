const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/tracks";

mongoose.connect(url).then((ans) => {
    console.log("connect Success");
}).catch((err) => {
    console.log("Error");
});

const Schema = mongoose.Schema;
const tracks = new Schema({
    name:       { type: String, require: true },
    description: { type: String, require: true },
    createdBy:  { type: Schema.Types.ObjectId, ref: 'users'},
    ownedBy:    { type: Schema.Types.ObjectId, ref: 'users'},
    favorited:  { type: Number, require: true },
    popularity: { type: Number, require: true },
    price:      { type: Number, require: true },
    views:      { type: Number, require: true },
    filepath:   { type: String, require: true },
    length:     { type: Number, require: true },
    transactions: [{
        data: {
            from:   { type: Schema.Types.ObjectId, ref: 'users'},
            to:     { type: Schema.Types.ObjectId, ref: 'users'}, 
            price:  { type: Number, require: true },
            date:   { type: Date, require: true }
        }
    }]
})
const userCollection = mongoose.model("tracks", tracks);
