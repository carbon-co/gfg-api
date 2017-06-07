
let Koa = require("koa");
let Router = require("./router/router");

const Database = require("./db/database");
let DBTest = require("./db/db-test");


async function main() {
    var app = new Koa();

    var router = new Router();
    router.addRoutes();

    // Configure middleware.

    // First add routes.
    app
        .use(router.getKoaRouter().routes())
        .use(router.getKoaRouter().allowedMethods());

    // Other middleware
    app.use(async (ctx, next) => {
        const start = new Date;
        return next().then(() => {
            const ms = new Date - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}`);
        });
    });

    await Database.connect();

    // Test the database.
    let dbTest = new DBTest();
    await dbTest.test();

    app.listen(3000);
    console.log("Listening on port 3000");
}

main();


