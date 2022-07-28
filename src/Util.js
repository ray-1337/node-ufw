const {exec} = require("child_process");
const {promisify} = require("util");
const promisifiedExec = promisify(exec);
const process = require("process");

module.exports.checkSudo = function () {
  return process.getuid && process.getuid() == 0 ? true : false;
};

module.exports.checkNodeVersion = function () {
  const currentApropriateVersion = 14, nodeVersion = process.versions.node.split('.');

  return +nodeVersion[0] > currentApropriateVersion ? true : false;
};

module.exports.checkPlatform = function () {
  // https://nodejs.org/api/process.html#process_process_platform
  return process.platform == "linux" ? true : false;
};

module.exports.getDistroInfo = async function () {
  let current = {
    distributorID: null, distributorVersion: null
  };

  try {
    // check version
    let {stdout, stderr} = await promisifiedExec('lsb_release -i -r');

    if (stderr) {
      throw new Error(`Error while checking Linux distribution information: ${stderr}`);
    };

    if (stdout) {
      // sanitize
      let parsed = stdout
      .split(/\r|\n/gi) // remove break lines
      .map(x => x.replace(/\s/gi, "")) // remove spaces, only remains [e.g. DistributorID:Ubuntu]
      .filter(x => x); // filter empty string

      let findDistributorID = parsed.find(val => val.match(/^(DistributorID)/gi));
      let findReleaseVersion = parsed.find(val => val.match(/^(Release)/gi));

      if (findDistributorID) {
        let splitViaColon = findDistributorID.split(/(:)/gi);
        if (splitViaColon) current.distributorID = splitViaColon.pop().toLowerCase();
      };

      if (findReleaseVersion) {
        let splitViaColon = findReleaseVersion.split(/(:)/gi);
        if (splitViaColon) current.distributorVersion = splitViaColon.pop().toLowerCase();
      };
    };
  } catch {};

  return current;
};

module.exports.checkPlatformExact = async function () {
  let distroInfo = await this.getDistroInfo();
  if (!distroInfo?.distributorID || !distroInfo?.distributorVersion) {
    throw new Error("Missing distro platform information.");
  };

  // https://en.wikipedia.org/wiki/Uncomplicated_Firewall
  let platform = distroInfo.distributorID;
  if (String(platform).toLowerCase() !== "ubuntu") {
    throw new Error("node-ufw only supported on Ubuntu.");
  };

  return true;
};

module.exports.checkAppropriatePort = function(port) {
  if (typeof port !== "number") {
    throw new Error("The port must be type of number.");
  };

  let portLimit = Math.round(2 ** 16 - 1);
  if (port <= 0 || port > portLimit) {
    throw new Error("Exceeded port limit.");
  };

  return true;
};

module.exports.checkAppropriateIP = function(address) {
  if (typeof address !== "string") {
    throw new Error("The address must be type of string.");
  };

  // https://blog.markhatton.co.uk/2011/03/15/regular-expressions-for-ip-addresses-cidr-ranges-and-hostnames/
  // also support subnet/net mask
  let regex = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(3[0-2]|[1-2][0-9]|[0-9]))?$/gi);
  if (!address.match(regex)) {
    throw new Error(`The IP address is not matched with ${regex.toString()} regular expressions.`);
  };

  return true;
};

// soon to be continued
// module.exports.checkPlatformVersion = function () {
//   let distroInfo = this.getDistroInfo();
//   if (!distroInfo?.distributorID || !distroInfo?.distributorVersion) {
//     throw new Error("Missing distro platform information.");
//   };
// };