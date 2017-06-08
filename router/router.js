
const KoaRouter = require("koa-router");

const CustomerRoutes = require("./routes/customer-routes");
const CharityRoutes = require("./routes/charity-routes");
const DonationRoutes = require("./routes/donation-routes");

class Router {
    
    constructor() {
        this.router = new KoaRouter();
    }

    addRoutes() {
        let customerRoutes = new CustomerRoutes();
        customerRoutes.addRoutes(this.router);

        let charityRoutes = new CharityRoutes();
        charityRoutes.addRoutes(this.router);

        let donationRoutes = new DonationRoutes();
        donationRoutes.addRoutes(this.router);
    }

    getKoaRouter() {
        return this.router;
    }

}


module.exports = Router;
