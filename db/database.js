
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/gfg";

class Database {

    static getInstance() {
        if (!this.db) {
            console.error("Using db without waiting to connect.");
        }

        return this.db;
    }

    static async connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    console.error(`error: ${err}`);
                    reject(err);
                }

                console.log("Successfully connected to database");
                this.db = db;
                resolve(this.db);
                });
        });
        
    }
}

module.exports = Database;
