import { exec } from "node:child_process";
import { promisify } from "node:util";
const promisifiedExec = promisify(exec);

/**
  * Disables and resets firewall to installation defaults. No prompt. Use this wisely. (root/sudo access is mandatory)=
*/
export default async function() {
  try {
    let res = await promisifiedExec("sudo ufw --force reset");

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