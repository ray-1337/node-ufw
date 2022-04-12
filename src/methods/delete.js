const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const util = require("../Util");

/**
  * Delete ufw rule(s). (root/sudo access is mandatory)
  * @param {number} num Number of the rules list. The first rule starts from number 1.
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports = async function(num) {
  util.checkNodeVersion();
  util.checkPlatform();
  await util.checkPlatformExact();
  
  try {
    if (!num) throw new Error("Missing num input.");
    if (typeof num !== "number") throw new Error("The num must be type of number.");
    if (num === 0) num = 1;

    let res = await promisifiedExec(`echo "y" | sudo ufw delete ${num}`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      return true;
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw new Error(err);
  };
};