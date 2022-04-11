const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);

/**
  * Disable ufw. (root/sudo access is mandatory)
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports = async function() {
  try {
    let res = await promisifiedExec(`echo "y" | sudo ufw disable`);

    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      if (res.stdout == "Firewall stopped and disabled on system startup") {
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