# Node UFW
Manipulate UFW (Linux distribution only) through Node.js.

## System Requirements
The module only supports [Node.js](https://nodejs.org) up to version 16, and Ubuntu version 18 or above.

This also requires **root** access, otherwise you will get an error from `ufw` itself, asking you a password with prompt.

## Installation
```shell
$ npm install node-ufw
$ pnpm add node-ufw
```

## Usage
```js
const nodeUfw = require("node-ufw"); // JavaScript
import * as nodeUfw from "node-ufw"; // TypeScript

await nodeUfw.allow.port(6379);
await nodeUfw.deny.port(25565, "udp");

await nodeUfw.allow.address("192.168.0.1");
await nodeUfw.deny.address("192.168.0.1", 80);
await nodeUfw.allow.address("192.168.0.1", 6379, "udp");

await nodeUfw.enable();
```

## Documentations
See [DOCS](docs/DOCS.md).

## LICENSE
See [LICENSE](LICENSE).
