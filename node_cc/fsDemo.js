import { error } from "console";
import fs from "fs/promises";

// // readFile() - async version callback version - non-blocking

// fs.readFile("./main.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // readFileSync() - synchronous version - blocking

// const data = fs.readFileSync("./main.txt", "utf-8");
// console.log(data);

// readFile() - promise version - async/await

const readFile = async () => {
  try {
    const data = await fs.readFile("./main.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// writeFile()

const writeFile = async () => {
  try {
    await fs.writeFile("./main.txt", "I'm writing on this file");
    console.log("File written to ...");
  } catch (error) {
    console.log(error);
  }
};

writeFile();
readFile();

// readFile - promise version - .then().catch()

// fs.readFile("./main.txt", "utf-8")
//   .then((data) => console.log(data))
//   .catch((error) => console.error());

// appendFile - .then().catch()

// fs.appendFile(
//   "./main.txt",
//   "\nThough this line is written from .then() promise type ...",
// )
//   .then(() => console.log("writting again on the same file ..."))
//   .catch((error) => console.log(error));

// appendFile - async/await

const appendFile = async () => {
  try {
    await fs.appendFile(
      "./main.txt",
      "\nnew line added from appendFile async function",
    );
    console.log("everything is okey :)");
  } catch (error) {
    console.log(error);
  }
};

appendFile();
