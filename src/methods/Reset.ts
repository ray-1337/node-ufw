import { runCommand, shouldDryRunDuringTesting } from "../Util";

/**
  * Disables and resets firewall to installation defaults. No prompt. Use this wisely. (root/sudo access is mandatory)=
*/
export default async function() {
  try {
    let command = await runCommand(`sudo ufw ${shouldDryRunDuringTesting} --force reset`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};