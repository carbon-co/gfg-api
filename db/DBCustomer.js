
let Database = require("./database");

class DBCustomer {

    static insertOne(customer){
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').insertOne((customer), function(err, r){
                if (err) {
                    reject(err);
                }
                console.log(`Inserted ${r}`);
                resolve(r);
            });
        });

    }

    static insertMany(customers) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').insertMany((customers), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static deleteOne(customer){
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').deleteOne((customer), function(err, r){
                if (err) {
                    reject(err);
                }
                console.log(`Inserted ${r}`);
                resolve(r);
            });
        });

    }

    static deleteMany(customers) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').deleteMany((customers), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static find(customers) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').find(customers).toArray(function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static updateOne(filter, update) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').findOneAndUpdate(filter, update, { returnOriginal: false }, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r.value);
            });
        });
    }

    static updateMany(oldCustomer, newCustomer) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('customers').updateMany(oldCustomer, newCustomer, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }
}


module.exports = DBCustomer;

