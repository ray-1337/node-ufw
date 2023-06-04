import { runCommand,shouldDryRunDuringTesting } from "../Util";

/**
  * Reloads firewall. (root/sudo access is mandatory)
*/
export default async function() {
  try {
    let command = await runCommand(`sudo ufw ${shouldDryRunDuringTesting} reload`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};