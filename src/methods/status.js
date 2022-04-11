const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);

module.exports = function(raw) {
  if (raw && typeof raw !== "boolean") {
    throw new Error("The raw must be type of boolean.");
  };

  try {
    let res = await promisifiedExec(`sudo ufw status`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      if (!raw) {
        let list = [];

        // parsing
        let parsedStatus = res.stdout.replace(/\r|\n/gi, "  ").split(/\s{2,}/gi).filter(x => x.length);
        if (!parsedStatus.length) return [];
        
        let findAfterFrom = parsedStatus.findIndex(x => x == "----");
        if (!findAfterFrom.length) return [];

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
      } else {
        return res.stdout;
      };
    };
  } catch (err) {
    throw new Error(err);
  };
};