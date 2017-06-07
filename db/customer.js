
const Customer = require("./schemas").Customer;

class DBCustomer {

    var createValidated = function(db, callback) {
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
    );

    insertOne(customer){
        return new Promise((resolve, reject) => {
            db.collection('customers').insertOne((customer), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    insertMany(customers) {

        return new Promise((resolve, reject) => {
            db.collection('customers').insertOne((customers), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

}


module.exports = DBCustomer;

