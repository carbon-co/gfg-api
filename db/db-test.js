
const DBMethods = require("./db-methods");
const Database = require("./database");
const Fetch = require("./FetchConsumers");
let ObjectID = require("mongodb").ObjectID;

const NUM_CHARITIES = 20;
const AMOUNT_FIXED_MIN = 1;
const AMOUNT_FIXED_MAX = 500;
const AMOUNT_PERCENT_MIN = 1;
const AMOUNT_PERCENT_MAX = 100;

class DBTest {

    async test() {
        await DBMethods.find("customers");
        // Fetch.fetchConsumer();

        await this.insertMockData();

        
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

    async insertMockData() {
        await this.clean();

        await this.insertCustomers();
        await this.insertCharities();
        await this.insertDonations();

        console.log("done inserting");
    }

    async clean() {
        let db = Database.getInstance();
        await db.collection("customers").drop();
        await db.collection("charities").drop();
        await db.collection("donations").drop();
    }

    async insertCustomers() {
        let json = require("../mock/customers.json");
        let customers = json.results;
        for (let customer of customers) {
            customer = delete customer.address;
        }
        customers.splice(100);
        await DBMethods.insertMany("customers", customers);
    }

    async insertCharities() {
        let json = require("../mock/mockorgs.json");
        let charities = json.orgs;
        await DBMethods.insertMany("charities", charities);
    }

    async insertDonations() {
        let customers = await DBMethods.find("customers");
        for (let customer of customers) {
            let numDonations = DBTest.rand(0, 5);
            let customerId = customer.id;

            let promises = [];
            for (let i = 0; i < numDonations; ++i) {
                let randType = DBTest.rand(0, 1);
                let randFreq = DBTest.rand(0, 1);

                let dateStartFirst = new Date(2015, 1, 1);
                let dateStartLast = new Date(2017, 6, 7);
                let dateEndLast = new Date(2017, 6, 8);

                let id = new ObjectID();
                let charity = DBTest.rand(0, NUM_CHARITIES - 1);                // 0 to n - 1
                let type = randType === 1 ? "fixed" : "cashback";
                let frequency = randFreq === 1 ? "once" : "recurring";

                let amount = DBTest.rand(AMOUNT_FIXED_MIN, AMOUNT_FIXED_MAX);

                // Generate percentage amount based on the type.
                let percent;
                if (type === "fixed") {
                    percent = 0;
                }
                else {
                    percent = DBTest.rand(AMOUNT_PERCENT_MIN, AMOUNT_PERCENT_MAX);
                }

                let dateStart = new Date(DBTest.rand(dateStartFirst.getTime(), dateStartLast.getTime()));
                // End date needs to be calculated below based on the frequency.
                let dateEnd;
                let subId;
                if (frequency === "once") {
                    // No subscription or end date for one-time donations.
                    dateEnd = null;
                    subId = null;
                }
                else {
                    dateEnd = new Date(DBTest.rand(dateStart.getTime(), dateEndLast.getTime()));
                    subId = new ObjectID();
                }

                let donation = {
                    id: id,
                    subId: subId,
                    customerId: customerId,
                    charity: charity,
                    type: type,
                    frequency: frequency,
                    amount: amount,
                    percent: percent,
                    dateStart: dateStart,
                    dateEnd: dateEnd
                }

                // console.log(donation);
                promises.push(DBMethods.insertOne("donations", donation));

                // Now, we need to generate donations for monthly recurring donations.
                // Note that only the id's and amount will change each donation
                if (frequency === "recurring") {
                    let numMonths = DBTest.diffMonths(dateStart, dateEnd);
                    for (let i = 0; i < numMonths; ++i) {
                        donation.id = new ObjectID();
                        donation.amount = DBTest.rand(AMOUNT_FIXED_MIN, AMOUNT_FIXED_MAX);
                        // console.log(donation);
                        // promises.push(DBMethods.insertOne("donations", donation));
                    }
                }
                
            }
            
            // console.log(charities);
            await Promise.all(promises);
        }
    }

    /**
     * Generate a random number n such that min <= n <= max.
     * @param {*} min 
     * @param {*} max
     */
    static rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Calculates the approximate number of months between two dates.
     * @param {*} dateStart 
     * @param {*} dateEnd 
     */
    static diffMonths(dateStart, dateEnd) {
        var diff = (dateEnd.getTime() - dateStart.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 30);
        return Math.round(diff);
    }

}

module.exports = DBTest;
