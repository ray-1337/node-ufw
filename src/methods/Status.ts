import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { ParsedStatus } from "../Typings";
const promisifiedExec = promisify(exec);

/**
  * List of currently activated ufw. (root/sudo access is mandatory)
*/
export default async function(raw?: boolean): Promise<string | ParsedStatus[] | null> {
  try {
    let res = await promisifiedExec("sudo ufw status");

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      if (raw) return res.stdout;
      
      let list = [];

      // parsing
      let parsedStatus = res.stdout.replace(/\r|\n/gi, "  ").split(/\s{2,}/gi).filter(x => x.length);
      if (!parsedStatus.length) return [];
      
      let findAfterFrom = parsedStatus.findIndex(x => x == "----");
      let afterSlice = parsedStatus.slice(findAfterFrom + 1, parsedStatus.length);
      if (!afterSlice.length) return [];
      
      for (let i = 0; i < afterSlice.length; i++) {
        if (i % 3 == 0) {
          let to = afterSlice[i];
          let action = afterSlice[i + 1];
          let from = afterSlice[i + 2];
          
          list.push({to, action, from});
        };
      };

      return list;
    };

    return null;
  } catch (err) {
    throw err;
  };
};