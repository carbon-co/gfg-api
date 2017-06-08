
let Database = require("./database");

class DBMethods {
    // CRUD Operations

    static find(collection, filter) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).find(filter).toArray((err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static insertOne(collection, entity) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).insertOne((entity), (err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });

    }

    static insertMany(collection, entities) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).insertMany((entities), (err, r) => {
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static deleteOne(collection, filter) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteOne((filter), (err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });

    }

    static deleteMany(collection, filter) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).deleteMany((filter), (err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });

    }

    static updateOne(collection, filter, update) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).findOneAndUpdate(filter, update, { returnOriginal: false }, (err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r.value);
            });
        });
    }

    static updateMany(collection, filter, update) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection(collection).updateMany(filter, update, (err, r) => {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }
}

module.exports = DBMethods;
