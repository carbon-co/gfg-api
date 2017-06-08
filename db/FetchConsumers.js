const fetch = require("node-fetch");

const url = 'http://api.reimaginebanking.com/enterprise/customers';

class FetchConsumers {

    static fetchConsumer(){
        fetch(url).then(function(data) {
            var retrieved = JSON.parse(this.responseText);
            var consumers = [];
            for(i = 0; i < retrieved.length; i++){
                consumers.push(retrieved[i]["first_name"] + "_" + retrieved[i]["last_name"]);
            }
            DBConsumer.insertOne(consumers);
        })
        .catch(function(error) {
            console.log("Cannot fetch");
        });
    }
}

module.exports = FetchConsumers;