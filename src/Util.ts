import { execSync, exec } from "node:child_process";
import { getuid, versions, platform } from "node:process";
import { promisify } from "node:util";

export const shouldDryRunDuringTesting = process.env.npm_lifecycle_event === "test" ? "--dry-run" : "";

export async function runCommand(command: string) {
  const promisifiedExec = promisify(exec);
  const { stderr, stdout } = await promisifiedExec(command);

  if (stderr) {
    throw stderr;
  };

  return stdout?.length ? stdout : null;
};

export function checkSudo() {
  return getuid && getuid() == 0 ? true : false;
};

export function checkNodeVersion() {
  const currentApropriateVersion = 16;
  const nodeVersion = versions.node.split('.');

  return +nodeVersion[0] > currentApropriateVersion ? true : false;
};

export function checkPlatform() {
  // https://nodejs.org/api/process.html#process_process_platform
  return platform == "linux" ? true : false;
};

export function checkPlatformExact() {
  try {
    const check = execSync("cat /etc/*release | grep -E ^NAME");
    return check?.toString("utf-8").match("Ubuntu") ? true : false;
  } catch (e) {
    console.error(e);
    return false;
  };
};

export function checkAppropriatePort(port: number) {
  const portLimit = Math.round(2 ** 16 - 1);

  return port > 0 || port <= portLimit;
};

export function checkAppropriateIP(address: string) {
  // https://blog.markhatton.co.uk/2011/03/15/regular-expressions-for-ip-addresses-cidr-ranges-and-hostnames/

  let regex = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(3[0-2]|[1-2][0-9]|[0-9]))?$/gi);
  return address.match(regex) !== null ? true : false;
};