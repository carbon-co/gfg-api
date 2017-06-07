
const DBCustomer = require("./customer");
const DBDonation = require("./DBDonation");
const DBCharity = require("./DBCharity");

class DBTest {

    async test() {
        await DBCustomer.insertOne({ donations: ["d1", "d2"] });
        await DBDonation.insertMany([{donations: ["d1", "d2"]}, {donations: ["d3", "d4"]}]);
        await DBCharity.insertOne({ donations: ["d1", "d2"] });
        var x = await DBCustomer.find({donations: ["d1", "d2"]});
        await console.log(x);
        x = await DBDonation.find({donations: ["d1", "d2"]});
        await console.log(x);
        x = await DBDonation.find({donations: ["d1", "d2"]});
        await console.log(x);
    }

}

module.exports = DBTest;
