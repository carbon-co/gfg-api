
let Database = require("../../db/database.js");

class CustomerRoutes {

    constructor() {

    }

    addRoutes(router) {
        router
            .get("/customers", async (ctx, next) => {
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await Database.find("customers", ctx.query);
                }
                else {
                    ctx.body = await Database.find();
                }
                
            })

            .post("/customers", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple customers");
                    ctx.body = await Database.insertMany("customers", reqBody);
                }
                else {
                    console.log("creating single customer");
                    ctx.body = await Database.insertOne("customers", reqBody);
                }

            })

            .delete("/customers", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (ctx.query) {
                    ctx.body = await Database.deleteMany("customers", ctx.query);
                }
                else {
                    ctx.body = await Database.deleteMany();
                }
            })

            .get("/customers/:id", async (ctx, next) => {
                ctx.body = (await Database.find("customers",
                {
                    id: ctx.params.id
                }))[0];
            })

            .put("/customers/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single customer");
                let filter = { id: ctx.params.id };
                let update = { $set: ctx.request.body };
                console.log(update);
                ctx.body = await Database.updateOne("customers", filter, update);
            })

            .delete("/customers/:id", async (ctx, next) => {
                ctx.body = await Database.deleteOne("customers",
                {
                    id: ctx.params.id
                });
            });
    }
}

module.exports = CustomerRoutes;