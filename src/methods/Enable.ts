import { exec } from "node:child_process";
import { promisify } from "node:util";
const promisifiedExec = promisify(exec);

export default async function() {
  try {
    // https://serverfault.com/a/790150
    let res = await promisifiedExec(`echo "y" | sudo ufw enable`);

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