import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { LoggingType } from "../Typings";
const promisifiedExec = promisify(exec);

/**
  * Set/toggle UFW logging. (root/sudo access is mandatory)
*/
export default async function(type: LoggingType) {
  try {
    let res = await promisifiedExec(`sudo ufw logging ${type}`);

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