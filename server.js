const path = require("path");
const fetch = require("node-fetch");
const math = require("mathjs");
const config = require("./config.json");

const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

fastify.register(require("fastify-formbody"));

fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

const address1 = "ban_3greenxg9oxkaei556wrxwzwdxie4ehmzhmi7fyztofhantxjysntceq5sx5";

const address2 =
"ban_3green9hp4hg8ejbpiq5fykktaz3scjoop9nzinq8m8kxu1xi6fi5ds3gwm8";
const address3 = "ban_3greengegg8of5dqjqfzqzkjkkygtaptn39uyja4xncd13eqftcpw4r4xmfb";
const address4 =
"ban_3greenp7kzetigfjcfgbis1ad63m4hyyyit9usd1g4byuxg81g79fc8aiwtr";

const qr1 = config.qr1
const qr2 = config.qr2
const qr3 = config.qr3
const qr4 = config.qr4

fastify.get("/", async function (request, reply) {
  const addressAPI = await fetch("https://bananoforest.com/api");
  const body = await addressAPI.json();

  var params = {
    add1: body.balance.add1,
    add2: body.balance.add2,
    add3: body.balance.add3,
    add4: body.balance.add4,
    date: process.env["date"]
  };
  reply.view("/src/pages/index.hbs", params);
});

fastify.get("/raffle", function (request, reply) {
  var params = {
    addressOrg1: { address: address1, qr: qr1 },
    addressOrg2: { address: address2, qr: qr2 },
    addressOrg3: { address: address3, qr: qr3 },
    addressOrg4: { address: address4, qr: qr4 },
    date: process.env["date"]
  };
  reply.view("/src/pages/raffle.hbs", params);
});

fastify.get("/faq", function (request, reply) {
  var params = {};
  reply.view("/src/pages/faq.hbs", params);
});

fastify.get("/api", async function (request, reply) {
  const resAddress1 = await fetch(
    "https://api.bananode.eu/v2/accounts/" + address1
  );
  const body1 = await resAddress1.json();

  const resAddress2 = await fetch(
    "https://api.bananode.eu/v2/accounts/"  + address2
  );
  const body2 = await resAddress2.json();

  const resAddress3 = await fetch(
    "https://api.bananode.eu/v2/accounts/" + address3
  );
  const body3 = await resAddress3.json();

  const resAddress4 = await fetch(
    "https://api.bananode.eu/v2/accounts/" + address4
  );
  const body4 = await resAddress4.json();

  reply.send({
    balance: {
    add1: math.evaluate(body1.account.balance * 10 ** -29),
    add2: math.evaluate(body2.account.balance * 10 ** -29),
    add3: math.evaluate(body3.account.balance * 10 ** -29),
    add4: math.evaluate(body4.account.balance * 10 ** -29),
  },
    pending: {
	    add1: math.evaluate(body1.account.pending * 10 ** -29),
		    add2: math.evaluate(body2.account.pending * 10 ** -29),
		    add3: math.evaluate(body3.account.pending * 10 ** -29),
		    add4: math.evaluate(body4.account.pending * 10 ** -29)
    }});
});

fastify.listen(3000, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});

