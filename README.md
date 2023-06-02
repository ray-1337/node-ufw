# Node UFW
Manipulate UFW (Linux distribution only, works best on Ubuntu) via Node.js.
> This module is under development. Use with caution.

## System Requirements
Only supported on [Node.js](https://nodejs.org) version 14 or above, and Ubuntu version 18 or above.

This also requires **root** access, or else you'll get an error from ufw itself/password prompt from Ubuntu.

## Installation
```shell
# npm
$ npm install node-ufw

# yarn
$ yarn add node-ufw
```

## Usage

```js
const nodeUfw = require("node-ufw").default; // JavaScript
import nodeUfw from "node-ufw"; // TypeScript

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
