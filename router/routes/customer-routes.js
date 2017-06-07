
let DBCustomer = require("../../db/DBCustomer.js");

class CustomerRoutes {

    constructor() {

    }

    addRoutes(router) {
        router
            .get("/customers", (ctx, next) => {
                
            })

            .post("/customers", (ctx, next) => {

            })

            .get("/customers/:id", (ctx, next) => {

            })

    }

}

module.exports = CustomerRoutes;
