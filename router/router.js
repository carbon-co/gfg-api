
const KoaRouter = require("koa-router");

const CustomerRoutes = require("./routes/customer-routes");

class Router {
    
    constructor() {
        this.router = new KoaRouter();
    }

    addRoutes() {
        let customerRoutes = new CustomerRoutes();
        customerRoutes.addRoutes(this.router);

    }

    getKoaRouter() {
        return this.router;
    }

}


module.exports = Router;
