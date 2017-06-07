
const DBCustomer = require("./customer");
const DBDonation = require("./DBDonation");
const DBCharity = require("./DBCharity");

class DBTest {

    async test() {
        await DBCustomer.insertOne({ donations: ["d1", "d2"] });
        await DBDonation.insertMany([{donations: ["d1", "d2"]}, {donations: ["d3", "d4"]}]);
        await DBCharity.insertOne({ donations: ["d1", "d2"] });
    }

}

module.exports = DBTest;
