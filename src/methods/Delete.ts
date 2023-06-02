import { exec } from "node:child_process";
import { promisify } from "node:util";
const promisifiedExec = promisify(exec);

/**
  * Delete ufw rule(s). (root/sudo access is mandatory)
*/
export default async function(num: number) {
  try {
    if (num === 0) {
      num = 1;
    };

    let res = await promisifiedExec(`echo "y" | sudo ufw delete ${num}`);

    if (res.stderr) {
      throw new Error(res.stderr);
    };

    if (res.stdout) {
      return true;
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw err;
  };
};