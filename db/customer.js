
let Database = require("./database");

class DBCustomer {
    /*var createValidated = function(db, callback) {
    db.createCollection("Donations",
        {
            'validator': { '$or':
                [{'Donations' : {'$type': "string"}}
                ]
            }
        },
        function(err, results) {
            console.log("Donation collection created.");
            callback();
        }
    );*/

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

}


module.exports = DBCustomer;

