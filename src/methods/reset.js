const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const util = require("../Util");

/**
  * Disables and resets firewall to installation defaults. No prompt. Use this wisely. (root/sudo access is mandatory)
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports = async function() {
  util.checkSudo();
  util.checkNodeVersion();
  util.checkPlatform();
  await util.checkPlatformExact();

  try {
    let res = await promisifiedExec(`sudo ufw --force reset`);

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