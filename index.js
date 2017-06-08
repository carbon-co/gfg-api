
let Koa = require("koa");
let BodyParser = require("koa-bodyparser");

let Router = require("./router/router");

const Database = require("./db/database");
let DBTest = require("./db/db-test");


async function main() {
    var app = new Koa();    

    // Configure middleware.

    // Body parser for requests.
    app.use(BodyParser());

    // Other middleware
    app.use(async (ctx, next) => {
        const start = new Date;
        await next();
        const ms = new Date - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });

    // Routes.
    let router = new Router();
    router.addRoutes();
    app
        .use(router.getKoaRouter().routes())
        .use(router.getKoaRouter().allowedMethods());


    await Database.connect();

    // Test the database.
    let dbTest = new DBTest();
    await dbTest.test();

    app.listen(3000);
    console.log("Listening on port 3000");
}

main();


