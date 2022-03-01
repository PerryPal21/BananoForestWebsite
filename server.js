const path = require("path");
const fetch = require("node-fetch")
const bjs = require("@bananocoin/bananojs")
const math = require("mathjs")


const fastify = require("fastify")({
  logger: false
});



fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

fastify.register(require("fastify-formbody"));

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});


fastify.get("/", async function(request, reply) {
  const addressAPI = await fetch("https://bananoforest.glitch.me/api")
  const body = await addressAPI.json();
  
  var params = { add1: body.add1, 
                add2:  body.add2, 
                add3:  body.add3, 
                add4:  body.add4}
  reply.view("/src/pages/index.hbs", params);
});

fastify.get("/raffle", function(request, reply) {
  var params = {}
  reply.view("/src/pages/raffle.hbs", params);
});

fastify.get("/faq", function(request, reply) {
  var params = {}
  reply.view("/src/pages/faq.hbs", params);
});

fastify.get("/api", async function(request, reply) {
  const address1 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  const address2 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  const address3 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  const address4 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  
  const resAddress1 = await fetch('https://api.creeper.banano.cc/v2/accounts/' + address1);
  const body1 = await resAddress1.json();
  
  const resAddress2 = await fetch('https://api.creeper.banano.cc/v2/accounts/' + address2);
  const body2 = await resAddress2.json();
  
  const resAddress3 = await fetch('https://api.creeper.banano.cc/v2/accounts/' + address3);
  const body3 = await resAddress3.json();
  
  const resAddress4 = await fetch('https://api.creeper.banano.cc/v2/accounts/' + address4);
  const body4 = await resAddress4.json();
  
    reply.send({ add1: math.evaluate(body1.account.balance**-29) , 
                add2: body2.account.balance, 
                add3: body3.account.balance, 
                add4: body4.account.balance })
});


fastify.listen(process.env.PORT, '0.0.0.0', function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
