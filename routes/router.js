
const KoaRouter = require("koa-router");

class Router {

    router;
    
    constructor() {
        this.router = new KoaRouter();
        this.setRoutes();
    }

    setRoutes() {
        // Rest API urls go here
        router.get("/", (ctx, next) => {
            ctx.body = "Hello World";
        });

        router.get("/users", (ctx, next) => {
            ctx.body = [
                {
                    name: "Tim",
                    address: "dsafs",
                    gfg: {
                        charities: ["charity1"],
                        donations: [
                            {
                                type: "fixed",
                                frequency: "once"
                            },
                            {
                                type: "percent",
                                frequencey: "monthly"
                            }
                        ]
                    }
                }
            ]
        });
    }

    getRoutes();

}



