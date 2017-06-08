
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/gfg";

class Database {

    static getInstance() {
        if (!this.db) {
            console.error("Attempting to use database without connecting first.");
        }
        return this.db;
    }

    static async connect() {
        try {
            let db = await MongoClient.connect(url);
            console.log("Successfully connected to database");
            this.db = db;

            // Create indexes.
            
            await this.db.collection("customers").createIndex({ "id": 1 }, { unique: true });

            await this.db.collection("charities").createIndex({ "id": 1 }, { unique: true });

            await this.db.collection("donations").createIndex({ "id": 1 }, { unique: true });

            return db;
        }
        catch(e) {
            console.error(e);
        }        
    }



}

module.exports = Database;
