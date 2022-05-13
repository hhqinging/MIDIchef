import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tracks = new Schema({
    assetID:        { type: Number,require: true },
    title:          { type: String, require: true },
    owner:          { type: String, require: true },
    creator:        { type: String, require: true },
    description:    { type: String, require: false },
    numFavorite:    { type: Number, require: true , default: 0},
    popularity:     { type: Number, require: true },
    price:          { type: Number, require: true },
    duration:       { type: String, require: true },
    img_src:        { type: String, require: true },
    src:            { type: String, require: true },
    marketStatus:   { type: Boolean, required: false, default: true  },
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

export default mongoose.model('Track', tracks);