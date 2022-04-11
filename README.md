# Node UFW
Manipulate UFW (Linux distribution only, works best on Ubuntu) via Node.js.

## System Requirements
Only supported on [Node.js](https://nodejs.org) version 14 or above, and Ubuntu version 18 or above.

## Installation
```
# npm user
$ npm install node-ufw

# yarn user
$ yarn add node-ufw
```

## Usage
```js
const nodeUfw = require("node-ufw");
await nodeUfw.allow.port("192.168.0.1"); // true
```

## LICENSE
MIT