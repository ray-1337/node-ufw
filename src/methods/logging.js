const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const util = require("../Util");

/**
  * Set/toggle UFW logging. (root/sudo access is mandatory)
  * @param {'off' | 'on' | 'low' | 'medium' | 'high' | 'full'} type A type of UFWlogging.
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports = async function(type) {
  try {
    if (!type) throw new Error("Missing type input.");
    if (typeof type !== "string") throw new Error("The type must be type of string.");

    type = type.toLowerCase();

    // https://manpages.ubuntu.com/manpages/focal/en/man8/ufw.8.html#logging
    let appropriateType = ['off', 'on', 'low', 'medium', 'high', 'full'];
    if (!appropriateType.includes(type)) {
      throw new Error(`Invalid type. Currently supported: ${appropriateType.join(", ")}`);
    };

    let res = await promisifiedExec(`sudo ufw logging ${type}`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      return true;
    } else {
      return false;
    };
  } catch (err) {
    throw new Error(err);
  };
};