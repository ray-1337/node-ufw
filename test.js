const test = require("ava");
const nodeUfw = require("./src/Main");

test("exceeded port", async (t) => {
  await t.throwsAsync(async () => {
    await nodeUfw.allow.port(12341242);
  }, {instanceOf: Error, message: 'Error: Exceeded port limit.'});

  await t.throwsAsync(async () => {
    await nodeUfw.deny.port(12341242);
  }, {instanceOf: Error, message: 'Error: Exceeded port limit.'});
});

test("wrongish", async (t) => {
  // port checking
  await t.throwsAsync(async () => {await nodeUfw.allow.port("SADOASD")}, {instanceOf: Error, message: "Error: The port must be type of number."});
  await t.throwsAsync(async () => {await nodeUfw.deny.port("ASMJDKNSC")}, {instanceOf: Error, message: "Error: The port must be type of number."});

  // protocol checking
  await t.throwsAsync(async () => {await nodeUfw.allow.port(12, 123124)}, {instanceOf: Error, message: "Error: The protocol must be type of string."});
  await t.throwsAsync(async () => {await nodeUfw.deny.port(12, 123124)}, {instanceOf: Error, message: "Error: The protocol must be type of string."});

  // wrong protocol
  await t.throwsAsync(async () => {await nodeUfw.allow.port(12, "SDSD")}, {instanceOf: Error, message: 'Error: The protocol must be either "tcp" or "udp"'});
  await t.throwsAsync(async () => {await nodeUfw.deny.port(12, "SDSD")}, {instanceOf: Error, message: 'Error: The protocol must be either "tcp" or "udp"'});
});

test("status raw cond", async (t) => {
  t.pass(await nodeUfw.status(true));
});

test("parsed status", async (t) => {
  t.pass(await nodeUfw.status());
});

test("sfw disabled", async (t) => {
  t.true(await nodeUfw.disable());
});

test("sfw enabled", async (t) => {
  t.true(await nodeUfw.enable());
});