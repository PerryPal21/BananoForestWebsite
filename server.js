const path = require("path");
const fetch = require("node-fetch")
const

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


fastify.get("/", function(request, reply) {
  var params = {}
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
  address1 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  address2 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  address3 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  address4 = "ban_3g535xyeuegynfmzc4jxksqy959pcb73ykby3h1b8w97eotomsejdjtperry"
  
  const resAddress1 = await fetch('https://api.creeper.banano.cc/v2/accounts/' + address1);
  const body = await resAddress1.json();
  console.log(body)
});


fastify.listen(process.env.PORT, '0.0.0.0', function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
