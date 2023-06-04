import type { ParsedStatus } from "../Typings";
import { runCommand, shouldDryRunDuringTesting } from "../Util";

/**
  * List of currently activated ufw. (root/sudo access is mandatory)
*/
export default async function(raw?: boolean): Promise<string | ParsedStatus[] | null> {
  try {
    let command = await runCommand(`sudo ufw ${shouldDryRunDuringTesting} status`);

    if (command) {
      if (raw) return command;
      
      let list = [];

      // parsing
      let parsedStatus = command.replace(/\r|\n/gi, "  ").split(/\s{2,}/gi).filter(x => x.length);
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