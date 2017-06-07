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

    static deleteOne(donation){
        let db = Database.getInstance();

        return new Promise((resolve, reject) => {
            db.collection('donations').deleteOne((donation), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static deleteMany(donations){
        let db = Database.getInstance();

        return new Promise((resolve, reject) => {
            db.collection('donations').deleteMany((donations), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }


    static find(donations) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('donations').find(donations).toArray(function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static updateOne(oldDonation, newDonation) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').updateOne(oldDonation, newDonation, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static updateMany(oldDonation, newDonation) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').updateMany(oldDonation, newDonation, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

}


module.exports = DBDonation;