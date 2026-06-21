import path from "path";
import url from "url";

const filePath = "./dir1/dir2/logs.txt";

// basename() -- filename
console.log(path.basename(filePath));

// dirname()
console.log(path.dirname(filePath));

// extname()
console.log(path.extname(filePath));

// parse()

console.log(path.parse(filePath));

// while using the esmodule type,
// you're gonna like create your own __filname and __dirname
// which are predefined within the commonjs module

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, "--", __dirname);

// join() -- to join multiple paths together based on the current operating system
const filePath2 = path.join(__dirname, "dir1", "dir2", "logs.txt");
console.log(filePath2);

// the same as join() we have resolve() method
