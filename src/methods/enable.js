const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);

/**
  * Enable ufw. (root/sudo access is mandatory)
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports.enable = async function() {
  try {
    // https://serverfault.com/a/790150
    let res = await promisifiedExec(`echo "y" | sudo ufw enable`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      if (res.stdout == "Firewall is active and enabled on system startup") {
        return true;
      } else {
        console.log(res.stdout);
        return false;
      };
    } else {
      return false;
    };
  } catch (err) {
    throw new Error(err);
  };
};