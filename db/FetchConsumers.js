const fetch = require("node-fetch");
const DBMethods = require("./db-methods");

const url = 'http://api.reimaginebanking.com/enterprise/customers?key=f4c72f015964b11n52072aa389cd022f4';

class FetchConsumers {

    static fetchConsumer(){
        fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(async function(json) {
            var retrieved = json;
            var consumers = [];
            for (i = 0; i < retrieved.length; i++) {
                consumers.push(retrieved[i]["first_name"] + "_" + retrieved[i]["last_name"]);
            }
            await DBMethods.insertMany(consumers);
        })
        .catch(function(error) {
            console.log(`Cannot fetch: ${error}`);
        });
    }
}

module.exports = FetchConsumers;
