import mongoose from 'mongoose';
const Schema = mongoose.Schema

// const url = "mongodb://localhost:27017/cse416";
// mongoose.connect(url).then((ans) => {
//     console.log("connect Success");
// }).catch((err) => {
//     console.log("Error");
// });


const test = new mongoose.Schema(
    { 
        username:   { type: String, require: false, default: "GUEST"},
        description: { type: String, require: false },
    },
    { timestamps: true },
);

export default mongoose.model('Tester',test);