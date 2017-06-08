
const DBMethods = require("./db-methods");
const Fetch = require("./FetchConsumers");

class DBTest {

    async test() {
        await DBMethods.find("customers");
        Fetch.fetchConsumer();
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

}

module.exports = DBTest;
