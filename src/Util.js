const {exec} = require("child_process");

module.exports.checkNodeVersion = function () {
  let currentApropriateVersion = 14;
  let nodeVersion = process.versions.node.split('.');

  if (Number(nodeVersion[0]) < currentApropriateVersion) {
    throw new Error(`The Node version must be at least v${currentApropriateVersion} or above.`);
  };

  return;
};

module.exports.checkPlatform = function () {
  let platform = process.platform;
  
  // https://nodejs.org/api/process.html#process_process_platform
  let inappropriatePlatform = ['aix', 'darwin', 'freebsd', 'openbsd', 'sunos', 'win32'];

  if (inappropriatePlatform.includes(platform)) {
    throw new Error("Your platform must be at least Linux.");
  };

  return;
};

module.exports.getDistroInfo = function () {
  let current = {
    distributorID: null, distributorVersion: null
  };

  // check version
  exec('lsb_release -i -r', (error, stdout, stderr) => {
    if (error || stderr) {
      throw new Error(`Error while checking Linux distribution information: ${stderr ? stderr : error}`);
    };

    if (stdout) {
      // sanitize
      let parsed = res
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
  });

  return current;
};

module.exports.checkPlatformExact = function () {
  let distroInfo = this.getDistroInfo();
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

// soon to be continued
// module.exports.checkPlatformVersion = function () {
//   let distroInfo = this.getDistroInfo();
//   if (!distroInfo?.distributorID || !distroInfo?.distributorVersion) {
//     throw new Error("Missing distro platform information.");
//   };
// };