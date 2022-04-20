// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// const url = "mongodb://localhost:27017/tracks";

// mongoose.connect(url).then((ans) => {
//     console.log("connect Success");
// }).catch((err) => {
//     console.log("Error");
// });

const tracks = new Schema({
    name:       { type: String, require: true },
    description: { type: String, require: false },
    createdBy:  { type: ObjectId, ref: 'User', require: true },
    ownedBy:    { type: ObjectId, ref: 'User', require: true },
    favorited:  { type: Number, require: true },
    popularity: { type: Number, require: true },
    price:      { type: Number, require: true },
    views:      { type: Number, require: true },
    filepath:   { type: String, require: true },
    length:     { type: Number, require: true },
    transactions: [{
        data: {
            from:   { type: ObjectId, ref: 'User', require: true },
            to:     { type: ObjectId, ref: 'User', require: true }, 
            price:  { type: Number, require: true },
            date:   { type: Date, require: true }
        }
    }]
})
module.exports = mongoose.model('Track', tracks);