
let DBCustomer = require("../../db/DBCustomer.js");

class CustomerRoutes {

    constructor() {

    }

    addRoutes(router) {
        router
            .get("/customers", async (ctx, next) => {
                // If query exists, then use it
                if (ctx.query) {
                    console.log(ctx.query);
                    ctx.body = await DBCustomer.find(ctx.query);
                }
                else {
                    ctx.body = await DBCustomer.find();
                }
                
            })

            .post("/customers", async (ctx, next) => {
                let reqBody = ctx.request.body;
                if (reqBody instanceof Array) {
                    console.log("creating multiple customers");
                    ctx.body = await DBCustomer.insertMany(reqBody);
                }
                else {
                    console.log("creating single customer");
                    ctx.body = await DBCustomer.insertOne(reqBody);
                }

            })

            .get("/customers/:id", async (ctx, next) => {
                ctx.body = await DBCustomer.find({
                    id: ctx.params.id
                });
            })

    }

}

module.exports = CustomerRoutes;
