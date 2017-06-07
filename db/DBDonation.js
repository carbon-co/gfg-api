let Database = require("./database");

class DBDonation{
    static insertOne(donation){
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('donations').insertOne((donation), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static insertMany(donations) {
        let db = Database.getInstance();

        return new Promise((resolve, reject) => {
            db.collection('donations').insertMany((donations), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

}


module.exports = DBDonation;