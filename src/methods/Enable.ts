import { runCommand, shouldDryRunDuringTesting } from "../Util";

export default async function() {
  try {
    // https://serverfault.com/a/790150
    let command = await runCommand(`echo "y" | sudo ufw ${shouldDryRunDuringTesting} enable`);
    return command !== null;
  } catch (err) {
    throw err;
  };
};