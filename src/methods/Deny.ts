import { exec } from "node:child_process";
import { promisify } from "node:util";
import { checkAppropriatePort, checkAppropriateIP } from "../Util";
import type { PortProtocol } from  "../Typings";

const promisifiedExec = promisify(exec);

/**
  * Deny incoming requests through specific port. (root/sudo access is mandatory)
*/
async function port(port: number, protocol?: PortProtocol) {
  try {
    // check port range
    let checkPort = checkAppropriatePort(port);
    if (!checkPort) return false;

    let res = await promisifiedExec(`echo "y" | sudo ufw deny ${port}${protocol ? `/${protocol}` : ""}`);
    if (res.stderr) {
      throw new Error(res.stderr);
    };

    if (res.stdout) {
      // will find a better way to parse this
      if (res.stdout.toLowerCase().match(/(added)/gi)) {
        return true;
      } else {
        console.log(res.stdout);
        return false;
      };
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw err;
  };
};

/**
  * Deny incoming requests through specific (IP) address. (root/sudo access is mandatory)
*/
async function address(address: string, port: number, protocol?: PortProtocol) {
  try {
    // address validation
    let checkAddress = checkAppropriateIP(address);
    if (!checkAddress) return false;

    // port validation
    if (port) {
      let checkPort = checkAppropriatePort(port);
      if (!checkPort) return false;
    };

    let res = await promisifiedExec(`echo "y" | sudo ufw deny from ${address} ${port ? `to any port ${port}` : ""} ${protocol ? `proto ${protocol}` : ""}`);
    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      // will find a better way to parse this
      if (res.stdout.toLowerCase().match(/(added)/gi)) {
        return true;
      } else {
        console.log(res.stdout);
        return false;
      };
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw err;
  };
};

export default {
  address, port
};