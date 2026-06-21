import { createServer } from "http";
import fs from "fs/promises";

const PORT = process.env.PORT || 4000;

const users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Alen",
  },
  {
    id: 3,
    name: "Saphir Rock",
  },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  const appendFile = async () => {
    try {
      await fs.appendFile(
        "./logs.txt",
        `${req.method} ${req.url} ${new Date()}\n`,
      );
    } catch (error) {
      console.log(error);
    }
  };
  appendFile();
  next();
};

// JSON middleware
const jsonMiddleWare = (req, res, next) => {
  res.setHeader("content-type", "application/json");
  next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.end(JSON.stringify(users));
};

// Route handler for GET /api/users/:id
const getUserById = (req, res) => {
  const id = req.url.split("/")[3];

  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({ msg: "User not found, please enter a valid id!" }),
    );
  }
};

// Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ msg: "404 Not Found" }));
};

// Route handler POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    console.log(newUser);
    users.push(newUser);
    res.statusCode = 201;
    res.setHeader("content-type", "text/html");
    res.end(`Hello ${newUser.name}`);
  });
};

const server = createServer((req, res) => {
  // Apply middlewares first
  logger(req, res, () => {
    jsonMiddleWare(req, res, () => {
      if (req.method === "GET" && req.url === "/api/users") {
        getUsersHandler(req, res);
      } else if (
        req.method === "GET" &&
        req.url.match(/\/api\/users\/([0-9]+)/)
      ) {
        getUserById(req, res);
      } else if (req.method === "POST" && req.url === "/api/users") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}...`);
});
