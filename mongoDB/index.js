const {mongo_find, mongo_insert, mongo_update, mongo_delete} = require("./mongo_op")

// mongo_find('users', {}, {projection: {_id: 0, username: 1, description: 1}}).catch(console.dir);
// mongo_find('tracks', {}, {projection: {_id: 0, name: 1, description: 1, views: 1}}).catch(console.dir);
// mongo_update('tracks', {name: 'SIGN'}, {$set: {views: 40}})
