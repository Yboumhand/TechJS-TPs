import os from "os";

// userInfo()

console.log(os.userInfo());

// totalmem() -- total memory of the system
console.log(os.totalmem());

// freemem() -- free memory of the system
console.log(os.freemem());

console.log("free space:", os.totalmem() - os.freemem(), "bytes");

// cpus() returns a list of objects containing information about each CPU/core installed in the system
console.log(os.cpus());
