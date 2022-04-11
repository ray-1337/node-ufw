# Node UFW Docs

## .allow.port(port: number, protocol?: "udp" | "tcp")
Allow incoming requests through specific port.
```js
await nodeUfw.allow.port(6379);
nodeUfw.allow.port(6379, "udp");
```
> returns `Promise<Boolean>`

## .allow.address(address: string, port?: number, protocol?: "udp" | "tcp")
Allow incoming requests through specific (IP) address.
```js
await nodeUfw.allow.address("192.168.0.1");
nodeUfw.allow.address("192.168.0.1", 6379);
```
> returns `Promise<Boolean>`

## .deny.port(port: number, protocol?: "udp" | "tcp")
Deny incoming requests through specific port.
```js
await nodeUfw.deny.port(6379);
nodeUfw.deny.port(6379, "udp");
```
> returns `Promise<Boolean>`

## .deny.address(address: string, port?: number, protocol?: "udp" | "tcp")
Deny incoming requests through specific (IP) address.
```js
await nodeUfw.deny.address("192.168.0.1");
nodeUfw.deny.address("192.168.0.1", 6379);
```
> returns `Promise<Boolean>`

## .delete(num: number)
Delete ufw rule. The number rule starts from number 1. See `sudo ufw status numbered` for more information.
> returns `Promise<Boolean>`

## .disable()
Disable UFW.
> returns `Promise<Boolean>`

## .enable()
Enable UFW.
> returns `Promise<Boolean>`

## .status(raw?: boolean)
List of currently activated UFW.
> returns `Promise<string | {to: string, action: string, from: string }[]>`