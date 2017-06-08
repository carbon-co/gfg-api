let Database = require("../../db/database.js");

class donationRoutes {

    constructor() {

    }

    addRoutes(router) {
        router
            .get("/donations", async (ctx, next) => {
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await Database.find("donations", ctx.query);
                }
                else {
                    ctx.body = await Database.find();
                }
                
            })

            .post("/donations", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple donations");
                    ctx.body = await Database.insertMany("donations", reqBody);
                }
                else {
                    console.log("creating single donation");
                    ctx.body = await Database.insertOne("donations", reqBody);
                }

            })

            .delete("/donations", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (ctx.query) {
                    ctx.body = await Database.deleteMany("donations", ctx.query);
                }
                else {
                    ctx.body = await Database.deleteMany();
                }
            })

            .get("/donations/:id", async (ctx, next) => {
                ctx.body = (await Database.find("donations",
                {
                    id: ctx.params.id
                }))[0];
            })

            .put("/donations/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single donation");
                let filter = { id: ctx.params.id };
                let update = { $set: ctx.request.body };
                console.log(update);
                ctx.body = await Database.updateOne("donations", filter, update);
            })

            .delete("/donations/:id", async (ctx, next) => {
                ctx.body = await Database.deleteOne("donations",
                {
                    id: ctx.params.id
                });
            });
    }
}

module.exports = donationRoutes;