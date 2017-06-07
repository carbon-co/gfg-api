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

}


module.exports = DBCharity;