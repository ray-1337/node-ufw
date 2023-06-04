import { runCommand, shouldDryRunDuringTesting } from "../Util";

/**
  * Delete ufw rule(s). (root/sudo access is mandatory)
*/
export default async function(num: number) {
  try {
    if (num === 0) {
      num = 1;
    };

    let command = await runCommand(`echo "y" | sudo ufw ${shouldDryRunDuringTesting} delete ${num}`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};