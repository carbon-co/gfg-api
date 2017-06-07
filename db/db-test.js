
const DBCustomer = require("./customer");

class DBTest {

    async test() {
        await DBCustomer.insertOne({ donations: ["d1", "d2"] });
    }

}

module.exports = DBTest;
