import mongoose from 'mongoose'
const { Schema } = mongoose;
import Track from "../models/track-model.js";
import users from "../models/user-model.js";
mongoose.set('debug', true);
export async function Create_song(song) {
    console.log(song.creator)
    const A = new Track({
        assetID: song.assetID,
        title: song.title,
        owner: song.owner,
        creator: song.creator,
        description: song.description,
        numFavorite: song.numFavorite,
        price: song.price,
        marketStatus: song.marketStatus,
        duration: song.duration,
        img_src: song.img_src,
        src: song.src,
        numPlay: song.numPlay,
        numDay: song.numDay,

    });
    A.save()
}

export async function Update_song(song) {
    console.log(song)
    const filter = { assetID: song.assetID };
    const update = {
        title: song.title,
        owner: song.owner,
        creator: song.creator,
        description: song.description,
        numFavorite: song.numFavorite,
        price: song.price,
        marketStatus: song.marketStatus,
        duration: song.duration,
        img_src: song.img_src,
        numPlay: song.numPlay,
        numDay: song.numDay,

    };
    Track.findOneAndUpdate(filter, update, {
        returnOriginal: false
    }, function (err, doc) {
        console.log(err)
        console.log(doc)
    })
}
export async function Create_new_user(user) {
    console.log(user)
    const A = new users({
        userName: user.username,
        description: user.description,
        profilePhoto: user.pfp,
        walletAddr: user.addresses[0],

    });
    A.save()
}
export async function Update_user(user) {
    console.log(user)
    const filter = { walletAddr: user.walletAddr };
    const update = {
        userName: user.username,
        description: user.description,
        profilePhoto: user.profilePhoto,
    };
    let old
    Users.findOne()
    .where("walletAddr")
    .equals(user.walletAddr)
    .then((test) => {
        old= test.userName
      }
    );
    Track.updateMany({ creator: old }, {
        creator: user.username
      });
    Track.updateMany({ owner: old }, {
        owner: user.username
      });
    users.findOneAndUpdate(filter, update, {
        returnOriginal: false
    }, function (err, doc) {
        console.log(err)
        console.log(doc)
    })
}

