import { runCommand,shouldDryRunDuringTesting } from "../Util";

/**
  * Disable ufw. (root/sudo access is mandatory)
*/
export default async function() {
  try {
    let command = await runCommand(`echo "y" | sudo ufw ${shouldDryRunDuringTesting} disable`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};