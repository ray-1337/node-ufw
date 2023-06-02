import { checkSudo, checkNodeVersion, checkPlatform, checkPlatformExact } from './Util';

if (!checkSudo()) {
  throw new Error("You need to be root to run this package.");
};

if (!checkNodeVersion()) {
  throw new Error(`The Node version must be at least v14 or above.`);
};

if (!checkPlatform()) {
  throw new Error("Your platform must be at least `linux`.");
};

if (!checkPlatformExact()) {
  throw new Error("node-ufw only supported on Ubuntu.");
};

export { default as allow } from "./methods/Allow";
export { default as deny } from "./methods/Deny";
export { default as disable } from "./methods/Disable";
export { default as enable } from "./methods/Enable";
export { default as status } from "./methods/Status";
export { default as delete } from "./methods/Delete";
export { default as reset } from "./methods/Reset";
export { default as reload } from "./methods/Reload";
export { default as logging } from "./methods/Logging"