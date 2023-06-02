import { exec } from "node:child_process";
import { promisify } from "node:util";
const promisifiedExec = promisify(exec);

/**
  * Disable ufw. (root/sudo access is mandatory)
*/
export default async function() {
  try {
    let res = await promisifiedExec(`echo "y" | sudo ufw disable`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      return true;
    } else {
      return false;
    };
  } catch (err) {
    throw err;
  };
};