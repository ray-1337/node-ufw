const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const util = require("../Util");

/**
  * Allow incoming requests through specific port. (root/sudo access is mandatory)
  * @param {number} port The connection pange. From range 1 - 65535.
  * @param {"udp" | "tcp" | undefined} protocol The protocol.
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports.port = async function (port, protocol) {
  try {
    if (!port) throw new Error("Missing port input.");
    if (typeof port !== "number") throw new Error("The port must be type of number.");

    // check port range
    let checkPort = util.checkAppropriatePort(port);
    if (!checkPort) return false;

    if (protocol) {
      if (typeof protocol !== "string") throw new Error("The protocol must be type of string.");
      if (protocol !== "tcp" || protocol !== "udp") throw new Error('The protocol must be either "tcp" or "udp"');
    };

    let res = await promisifiedExec(`echo "y" | sudo ufw allow ${port}${protocol ? `/${protocol}` : ""}`);
    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      // will find a better way to parse this
      if (res.stdout.toLowerCase().match(/(added)/gi)) {
        return true;
      } else {
        console.log(res.stdout);
        return false;
      };
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw new Error(err);
  };
};

/**
  * Allow incoming requests through specific (IP) address. (root/sudo access is mandatory)
  * @param {string} address IP address, supported by subnet/net mask. From range 0.0.0.0 to 255.255.255.255
  * @param {number | undefined} port The connection pange. From range 1 - 65535.
  * @param {"udp" | "tcp" | undefined} protocol The protocol.
  * @returns {Promise<Boolean>} Returns a boolean.
*/
module.exports.address = async function (address, port, protocol) {
  try {
    // address validation
    if (!address) throw new Error("Missing address input.");
    if (typeof address !== "string") throw new Error("The address must be type of string.");
    let checkAddress = util.checkAppropriateIP(address);
    if (!checkAddress) return false;

    // port validation
    if (port) {
      if (typeof port !== "number") throw new Error("The port must be type of number.");
      let checkPort = util.checkAppropriatePort(port);
      if (!checkPort) return false;
    };

    // protocol (tcp/udp) validation
    if (protocol) {
      if (typeof protocol !== "string") throw new Error("The protocol must be type of string.");
      if (protocol !== "tcp" || protocol !== "udp") throw new Error('The protocol must be either "tcp" or "udp"');
    };

    let res = await promisifiedExec(`echo "y" | sudo ufw allow from ${address} ${port ? `to any port ${port}` : ""} ${protocol ? `proto ${protocol}` : ""}`);
    if (res.stderr) throw new Error(res.stderr);

    if (res.stdout) {
      // will find a better way to parse this
      if (res.stdout.toLowerCase().match(/(added)/gi)) {
        return true;
      } else {
        console.log(res.stdout);
        return false;
      };
    } else {
      console.log(res.stdout);
      return false;
    };
  } catch (err) {
    throw new Error(err);
  };
};