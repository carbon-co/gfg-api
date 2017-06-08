const fetch = require("node-fetch");
const DBMethods = require("./db-methods");

const url = 'http://api.reimaginebanking.com/enterprise/customers?key=cd5a88297a77e98f9c52bf911e28e597';

class FetchConsumers {

    static fetchConsumer(){
        fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(async function(json) {
            var retrieved = json.results;
            console.log(retrieved);
            var consumers = [];
            for (let i = 0; i < retrieved.length; i++) {
                consumers.push({
                    "name": retrieved[i]["first_name"] + "_" + retrieved[i]["last_name"]
                });
            }
            await DBMethods.insertMany("customers", consumers);
        })
        .catch(function(error) {
            console.log(`Cannot fetch: ${error}`);
        });
    }
}

module.exports = FetchConsumers;
