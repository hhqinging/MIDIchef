# MIDIChef Backend
## express.js


Tasks/Routes:
* backend
    - User authentication from frontend
* frontend <-> database
    - request user data from database -> send user data to frontend
    - request track data from database -> send track data to frontend
    - receive account creation request -> ask database to create new entry
    - receive track info from frontend -> create track in database
* frontend <-> crypto
    - request transaction data from crypto -> send transaction data to frontend
    - send transaction request to crypto -> crypto performs transaction