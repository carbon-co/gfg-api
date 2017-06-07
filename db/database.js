
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/gfg";

module.exports = class Database {
    constructor() {
        
    }

    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    console.error(`error: ${err}`);
                    reject(err);
                }

                console.log("Successfully connected to database");
                resolve(db);
                });
        });
        
    }

}
