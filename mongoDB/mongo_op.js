const {MongoClient} = require("mongodb")
const {mongodb_uri} = require("./config.json")
const fs = require('fs')


const client = new MongoClient(mongodb_uri);
const db_name = 'CSE416-HASH';


async function mongo_insert(collection, obj) {
    try {
        await client.connect();
        const database = client.db(db_name);
        const table = database.collection(collection);
        const result = await table.insertOne(obj);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

async function mongo_find(collection, query, options, file_path) {
    try {
        await client.connect();
        const database = client.db(db_name);
        const table = database.collection(collection);
        const cursor = table.find(query, options);
        if ((await cursor.countDocuments) === 0) {
            console.log("No documents found!");
        }
        // await cursor.forEach(console.dir);
        let data = await cursor.toArray();
        fs.writeFileSync(file_path, JSON.stringify(data));
    } finally {
        await client.close();
    }
}

async function mongo_update(collection, filter, updateDoc, options) {
    try {
        await client.connect();
        const database = client.db(db_name);
        const table = database.collection(collection);
        const result = await table.updateOne(filter, updateDoc, options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
    } finally {
        await client.close();
    }
}

async function mongo_delete(collection, query) {
    try {
        await client.connect();
        const database = client.db(db_name);
        const table = database.collection(collection);
        const result = await table.deleteOne(query);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
    } finally {
        await client.close();
    }
}


module.exports = {mongo_find, mongo_insert, mongo_update, mongo_delete};
