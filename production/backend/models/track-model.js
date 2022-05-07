// const { ObjectId } = require('mongodb');
//const mongoose = require('mongoose')
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// const url = "mongodb://localhost:27017/tracks";

// mongoose.connect(url).then((ans) => {
//     console.log("connect Success");
// }).catch((err) => {
//     console.log("Error");
// });

const tracks = new Schema({
    assetID: {type: Number,require: true},
    title:          { type: String, require: true },
    owner:          { type: String, require: true },
    creater:        { type: String, require: true },
    description: { type: String, require: false },
    numFavorite: { type: Number, require: true },
    popularity: { type: Number, require: true },
    price:      { type: Number, require: true },
    duration:    { type: String, require: true },
    img_src:    { type: String, require: true },
    src:        { type: String, require: true },
    numPlay:    { type: Number, require: true },
    numDay:     { type: Number, require: true },
    transactions: [{
        data: {
            from:   { type: String, require: true },
            to:     { type: String, require: true },
            price:  { type: Number, require: true },
            date:   { type: Date, require: true }
        }
    }]
    
},{timestamps: true },
)

//get track info by id
tracks.statics.findById = function(id) {
    return (this.where({ _id : new RegExp(id, 'i')})).cast()
}

//get track info by name
tracks.statics.findByName = function(name) {
    return (this.where({ name : new RegExp(name, 'i')})).cast()
}
export default mongoose.model('Track', tracks);