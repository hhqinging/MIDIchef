const User = require('../../production/backend/models/user-model');
const Track = require('../../production/backend/models/track-model')

//get user info by walletAddr
const findUserByWallet = async wa => {
    const foundUser = await User.findOne({ walletAddr: wa });
    console.log(foundUser)
    // User.findOne({ walletAddr : wa }).populate('user')
    //     .exec(function (err, user) {
    //         if (!err) console.log('User is %s', user.us) 
    //     })
}

//get track info by id
const findTrackById = async id => {
    const foundIdTrack = await Track.findOne({ _id: id });
    console.log(foundIdTrack)
}

//get track info by name
const findTrackByName = async name => {
    const foundTrack = await Track.find({ name: name });
    console.log(foundTrack)
}
