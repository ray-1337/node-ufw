const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const util = require("../Util");

/**
  * Reloads firewall. (root/sudo access is mandatory)
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports = async function() {
  util.checkSudo();
  util.checkNodeVersion();
  util.checkPlatform();
  await util.checkPlatformExact();

  try {
    let res = await promisifiedExec(`sudo ufw reload`);

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