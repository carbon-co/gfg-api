let Database = require("./database");

class DBCharity{
    static insertOne(charity){
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').insertOne((charity), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static insertMany(charities) {
        let db = Database.getInstance();

        return new Promise((resolve, reject) => {
            db.collection('charities').insertMany((charities), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    static find(charities) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').find(charities).toArray(function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static updateOne(oldCharity, newCharity) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').updateOne(oldCharity, newCharity, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }

    static updateMany(oldCharity, newCharity) {
        let db = Database.getInstance();
        return new Promise((resolve, reject) => {
            db.collection('charities').updateMany(oldCharity, newCharity, function(err, r) {
                if (err) {
                    reject(err);
                }
                resolve(r);
            });
        });
    }
}


module.exports = DBCharity;
