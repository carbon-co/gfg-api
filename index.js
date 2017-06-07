
var Koa = require("koa");
var Router = require("koa-router");
const Database = require("./db/database");


app
    .use(router.routes())
    .use(router.allowedMethods());


// Other middleware
app.use(async (ctx, next) => {
  const start = new Date;
  return next().then(() => {
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });
});

async function main() {
    var app = new Koa();
    var router = new Router();

    let db = new Database();
    await db.connect();
    app.listen(3000);
    console.log("Listening on port 3000");
}

main();


