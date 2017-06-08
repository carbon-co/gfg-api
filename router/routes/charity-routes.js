let Database = require("../../db/database.js");

class charityRoutes {

    constructor() {

    }

    addRoutes(router) {
        router
            .get("/charities", async (ctx, next) => {
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await Database.find("charities", ctx.query);
                }
                else {
                    ctx.body = await Database.find();
                }
                
            })

            .post("/charities", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple charities");
                    ctx.body = await Database.insertMany("charities", reqBody);
                }
                else {
                    console.log("creating single charity");
                    ctx.body = await Database.insertOne("charities", reqBody);
                }

            })

            .delete("/charities", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (ctx.query) {
                    ctx.body = await Database.deleteMany("charities", ctx.query);
                }
                else {
                    ctx.body = await Database.deleteMany();
                }
            })

            .get("/charities/:id", async (ctx, next) => {
                ctx.body = (await Database.find("charities",
                {
                    id: ctx.params.id
                }))[0];
            })

            .put("/charities/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single charity");
                let filter = { id: ctx.params.id };
                let update = { $set: ctx.request.body };
                console.log(update);
                ctx.body = await Database.updateOne("charities", filter, update);
            })

            .delete("/charities/:id", async (ctx, next) => {
                ctx.body = await Database.deleteOne("charities",
                {
                    id: ctx.params.id
                });
            });
    }
}

module.exports = charityRoutes;