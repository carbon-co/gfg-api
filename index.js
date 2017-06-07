
var Koa = require("koa");
var Router = require("koa-router");
const Database = require("./db/database");

var app = new Koa();
var router = new Router();

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

let db = new Database();
db.connect().then((resolve, reject) => {
    app.listen(3000);
    console.log("Listening on port 3000");
});


fs.read("./users.json", (err, data) => {
    console.log("data");
});







