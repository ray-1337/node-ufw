const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);

// disable
module.exports.disable = async function() {
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
    };
  } catch (err) {
    throw new Error(err);
  };
};