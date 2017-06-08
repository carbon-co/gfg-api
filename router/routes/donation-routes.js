
let ObjectID = require("mongodb").ObjectID;

let DBMethods = require("../../db/db-methods");


class DonationRoutes {

    addRoutes(router) {
        router
            .get("/donations", async (ctx, next) => {
                console.log(DBMethods.db);
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await DBMethods.find("donations", ctx.query);
                }
                else {
                    ctx.body = await DBMethods.find("donations");
                }

            })

            .post("/donations", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple donations");
                    reqBody = reqBody.map(DonationRoutes.createDonation);
                    ctx.body = await DBMethods.insertMany("donations", reqBody);
                }
                else {
                    console.log("creating single donation");
                    let donation = DonationRoutes.createDonation(reqBody);
                    ctx.body = await DBMethods.insertOne("donations", donation);
                }

            })

            .delete("/donations", async (ctx, next) => {
                ctx.body = await DBMethods.deleteMany("donations", ctx.request.body);
            })

            .get("/donations/:id", async (ctx, next) => {
                ctx.body = (await DBMethods.find("donations", {
                    id: ctx.params.id
                }))[0];
            })

            .put("/donations/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single donation");
                let filter = { id: ctx.params.id };
                let update = { $set: reqBody };
                console.log(update);
                ctx.body = await DBMethods.updateOne("donations", filter, update);
            })

            .delete("/donations/:id", async (ctx, next) => {
                ctx.body = await DBMethods.deleteOne("donations", {
                    id: ctx.params.id
                });
            });

    }


    /**
     * Generates the additional fields for a donation.
     * @param {*} donationOpts 
     */
    static createDonation(donationOpts) {
        let id = new ObjectID();
        let subId;
        let dateEnd = null;
        if (donationOpts.frequency === "recurring") {
            subId = new ObjectID();
        }
        else {
            subId = null;
        }
        
        let donation = {
            id: new ObjectID(),
            subId: subId,
            customerId: donationOpts.customerId,
            charity: donationOpts.charity,
            type: donationOpts.type,
            frequency: donationOpts.frequency,
            amount: donationOpts.amount,
            percent: donationOpts.percent,
            dateStart: new Date(),
            dateEnd: null
        };
        
        return donation;
    }

}

module.exports = DonationRoutes;
