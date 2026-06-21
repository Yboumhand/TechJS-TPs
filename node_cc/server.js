// Our new entry point for the application
import http from "http";
// to handle I/O asynchronously
import fs from "fs/promises";
import url from "url";
import path from "path";
const PORT = process.env.PORT || 3000;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// it returns the absolute path of the file
console.log(__filename);
// it returns the absolute path of the directory
console.log(__dirname);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not Found!");
      }
      // Display the data of the target file
      const data = await fs.readFile(filePath);
      res.setHeader("content-type", "text/html");
      res.end(data);
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h3 style='color: red;'>404 Not Found</h3>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT} ...`);
});
