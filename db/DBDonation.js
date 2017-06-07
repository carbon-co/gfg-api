class DBDonation{
    insertOne(donation){
        return new Promise((resolve, reject) => {
            db.collection('donations').insertOne((donation), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    insertMany(donations) {

        return new Promise((resolve, reject) => {
            db.collection('donations').insertMany((donation), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

}


module.exports = DBDonation;