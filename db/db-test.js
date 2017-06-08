
const DBMethods = require("./db-methods");
const Fetch = require("./FetchConsumers");
let ObjectID = require("mongodb").ObjectID;

const NUM_CHARITIES = 20;

class DBTest {

    async test() {
        await DBMethods.find("customers");
        // Fetch.fetchConsumer();

        // await this.insertCustomersCharities();
        // await this.insertDonations();

        
        // await DBCustomer.insertOne({ donations: ["d1", "d2"] });
        // await DBDonation.insertMany([{donations: ["d1", "d2"]}, {donations: ["d3", "d4"]}]);
        // await DBCharity.insertOne({ donations: ["d1", "d2"] });
        // var x = await DBCustomer.find({donations: ["d1", "d2"]});
        // await console.log(x);
        // x = await DBDonation.find({donations: ["d1", "d2"]});
        // await console.log(x);
        // x = await DBCharity.find({donations: ["d1", "d2"]});
        // await console.log(x);
        // await DBCharity.updateOne({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBCustomer.updateOne({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBDonation.updateOne({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBCharity.updateMany({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBCustomer.updateMany({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBDonation.updateMany({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBCharity.deleteOne({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
        // await DBCustomer.deleteMany({donations: ["d1", "d2"]}, {$set: {donations: ["d1"]}});
    }

    async insertCustomersCharities() {
        let json = require("../mock/customers.json");
        let customers = json.results;
        for (let customer of customers) {
            customer = delete customer.address;
        }
        customers.splice(99);
        await DBMethods.insertMany("customers", customers);

        json = require("../mock/mockorgs.json");
        let charities = json.orgs;
        await DBMethods.insertMany("charities", charities);

        console.log("done inserting");
    }

    async insertDonations() {
        let customers = await DBMethods.find("customers");
        for (let customer of customers) {
            let numCharities = DBTest.rand(0, 10);
            let randType = Math.random() % 2;
            let randFreq = Math.random() % 2;
            let startDateBegin = new Date(2015, 1, 1);
            let startDateEnd = new Date(2017, 6, 8);
            let endDateBegin = new Date(2015, 1, 2);
            let endDateEnd = new Date(2017, 6, 8);

            let id = new ObjectID();
            let promises = [];
            for (let i = 0; i < numCharities; ++i) {
                let charityId = DBTest.rand(0, NUM_CHARITIES);
                promises.push(DBMethods.find("charities", { id: charityId }));
            }
            let charities = await Promise.all(promises);
            console.log(charities);
        }
    }

    static rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}

module.exports = DBTest;
