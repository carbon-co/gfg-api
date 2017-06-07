
const DBCustomer = require("./customer");

class DBTest {

    async test() {
        let dbCustomer = new DBCustomer();
        await dbCustomer.insertOne({ donations: ["d1", "d2"] });
    }

}

module.exports = DBTest;
