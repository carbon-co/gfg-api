
let DBMethods = require("../../db/db-methods");

class CharityRoutes {

    addRoutes(router) {
        router
            .get("/charities", async (ctx, next) => {
                console.log(DBMethods.db);
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await DBMethods.find("charities", ctx.query);
                }
                else {
                    ctx.body = await DBMethods.find("charities");
                }

            })

            .post("/charities", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple charities");
                    ctx.body = await DBMethods.insertMany("charities", reqBody);
                }
                else {
                    console.log("creating single charity");
                    ctx.body = await DBMethods.insertOne("charities", reqBody);
                }

            })

            .delete("/charities", async (ctx, next) => {
                ctx.body = await DBMethods.deleteMany("charities", ctx.request.body);
            })

            .get("/charities/:id", async (ctx, next) => {
                ctx.body = (await DBMethods.find("charities", {
                    id: ctx.params.id
                }))[0];
            })

            .put("/charities/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single charity");
                let filter = { id: ctx.params.id };
                let update = { $set: reqBody };
                console.log(update);
                ctx.body = await DBMethods.updateOne("charities", filter, update);
            })

            .delete("/charities/:id", async (ctx, next) => {
                ctx.body = await DBMethods.deleteOne("charities", {
                    id: ctx.params.id
                });
            });

    }

}

module.exports = CharityRoutes;
