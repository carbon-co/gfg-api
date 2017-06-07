
const KoaRouter = require("koa-router");

class Router {
    
    constructor() {
        this.router = new KoaRouter();
    }

    addRoutes() {
        // Rest API urls go here
        this.router.get("/", (ctx, next) => {
            ctx.body = "Hello World";
        });

        this.router.get("/customers", (ctx, next) => {
            
        });

        
    }

    getKoaRouter() {
        return this.router;
    }

}


module.exports = Router;
