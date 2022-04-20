const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(
    process.send.DB_CONNECT, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    }
)

module.exports = mongoose.connection