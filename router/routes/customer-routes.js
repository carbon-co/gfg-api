
let DBMethods = require("../../db/db-methods");

class CustomerRoutes {

    addRoutes(router) {
        router
            .get("/customers", async (ctx, next) => {
                console.log(DBMethods.db);
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await DBMethods.find("customers", ctx.query);
                }
                else {
                    ctx.body = await DBMethods.find("customers");
                }
                
            })

            .post("/customers", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple customers");
                    ctx.body = await DBMethods.insertMany("customers", reqBody);
                }
                else {
                    console.log("creating single customer");
                    ctx.body = await DBMethods.insertOne("customers", reqBody);
                }

            })

            .delete("/customers", async (ctx, next) => {
                ctx.body = await DBMethods.deleteMany("customers", ctx.request.body);
            })

            .get("/customers/:id", async (ctx, next) => {
                ctx.body = (await DBMethods.find("customers", {
                    id: ctx.params.id
                }))[0];
            })

            .put("/customers/:id", async (ctx, next) => {
                let reqBody = ctx.request.body;
                console.log("updating single customer");
                let filter = { id: ctx.params.id };
                let update = { $set: reqBody };
                console.log(update);
                ctx.body = await DBMethods.updateOne("customers", filter, update);
            })

            .delete("/customers/:id", async (ctx, next) => {
                ctx.body = await DBMethods.deleteOne("customers", {
                    id: ctx.params.id
                });
            });

    }

}

module.exports = CustomerRoutes;
