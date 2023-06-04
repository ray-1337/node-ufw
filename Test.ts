import test from "ava";
import * as ufw from "./src/Index";

test("allow port", async (t) => t.true(await ufw.allow.port(1337)));
test("allow ip address", async (t) => t.true(await ufw.allow.address("1.1.1.1")));

test("delete specific rule", async (t) => t.true(await ufw.delete(1)));

test("deny port", async (t) => t.true(await ufw.deny.port(1337)));
test("deny ip address", async (t) => t.true(await ufw.deny.address("1.1.1.1")));

test("enable firewall", async (t) => t.true(await ufw.enable()));
test("disable firewall", async (t) => t.true(await ufw.disable()));
test("reload firewall", async (t) => t.true(await ufw.reload()));
test("reset firewall", async (t) => t.true(await ufw.reset()));