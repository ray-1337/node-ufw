# Node UFW
Manipulate UFW (Linux distribution only, works best on Ubuntu) via Node.js.

## System Requirements
Only supported on [Node.js](https://nodejs.org) version 14 or above, and Ubuntu version 18 or above.

## Installation
```shell
# npm user
$ npm install node-ufw

# yarn user
$ yarn add node-ufw
```

## Usage
```js
const nodeUfw = require("node-ufw");

await nodeUfw.allow.port(6379);
await nodeUfw.deny.port(25565, "udp");

await nodeUfw.allow.address("192.168.0.1");
await nodeUfw.deny.address("192.168.0.1", 80);
await nodeUfw.allow.address("192.168.0.1", 6379, "udp");

await nodeUfw.enable();
```

## Documentations
See [DOCS](https://github.com/ray-1337/node-ufw/blob/master/docs/DOCS.md).

## LICENSE
See [LICENSE](https://github.com/ray-1337/node-ufw/blob/master/LICENSE).
