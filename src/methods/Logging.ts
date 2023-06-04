import { runCommand, shouldDryRunDuringTesting } from "../Util";
import type { LoggingType } from "../Typings";

/**
  * Set/toggle UFW logging. (root/sudo access is mandatory)
*/
export default async function(type: LoggingType) {
  try {
    let command = await runCommand(`sudo ufw ${shouldDryRunDuringTesting} logging ${type}`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};