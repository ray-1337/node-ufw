import { checkAppropriatePort, isAddedOrUpdated, checkAppropriateIP, runCommand, shouldDryRunDuringTesting } from "../Util";
import type { PortProtocol } from  "../Typings";

/**
  * Allow incoming requests through specific port. (root/sudo access is mandatory)
*/
async function port(port: number, protocol?: PortProtocol) {
  try {
    // check port range
    let checkPort = checkAppropriatePort(port);
    if (!checkPort) return false;

    let command = await runCommand(`echo "y" | sudo ufw ${shouldDryRunDuringTesting} allow ${port}${protocol ? `/${protocol}` : ""}`);
    return command ? isAddedOrUpdated(command) : false;
  } catch (err) {
    throw err;
  };
}

/**
  * Allow incoming requests through specific (IP) address. (root/sudo access is mandatory)
*/
async function address(address: string, port?: number, protocol?: PortProtocol) {
  try {
    // address validation
    let checkAddress = checkAppropriateIP(address);
    if (!checkAddress) return false;

    // port validation
    if (port) {
      let checkPort = checkAppropriatePort(port);
      if (!checkPort) return false;
    };

    let command = await runCommand(`echo "y" | sudo ufw allow from ${address} ${port ? `to any port ${port}` : ""} ${protocol ? `proto ${protocol}` : ""}`);
    return command ? isAddedOrUpdated(command) : false;
  } catch (err) {
    throw err;
  };
}

export default {
  address, port
};