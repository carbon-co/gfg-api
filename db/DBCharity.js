class DBCharity{
    insertOne(charity){
        return new Promise((resolve, reject) => {
            db.collection('charities').insertOne((charity), function(err, r){
                if (err) {
                    reject(err);
                }

                resolve(r);
            });
        });

    }

    insertMany(charities) {

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
