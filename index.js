// import http from "node:http";
// import fs from "node:fs/promises";
import express from "express";
const app = express();

const __dirname = import.meta.dirname;
const options = { root: __dirname };

function sendError(res, err) {
  res.status(500).send("Internal server error.");
  console.error(`${res.statusCode} Error: ${err.message}`);
}

app.get("/", (req, res) => {
  res.sendFile("./index.html", options, (err) => {
    if (err) sendError(res, err);
  });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", options, (err) => {
    if (err) sendError(res, err);
  });
});

app.get("/contact-me", (req, res) => {
  res.sendFile("./contact-me.html", options, (err) => {
    if (err) sendError(res, err);
  });
});

app.get(/\/.*/, (req, res) => {
  res.status(404).sendFile("./404.html", options, (err) => {
    if (err) sendError(res, err);
  });
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) throw err;
});

// http
//   .createServer((req, res) => {
//     async function loadPage() {
//       try {
//         let data;
//         let code = 200;
//         if (req.url === "/") {
//           data = await fs.readFile("./index.html");
//         } else if (req.url === "/about") {
//           data = await fs.readFile("./about.html");
//         } else if (req.url === "/contact-me") {
//           data = await fs.readFile("./contact-me.html");
//         } else {
//           data = await fs.readFile("./404.html");
//           code = 404;
//         }
//         res.writeHead(code, { "Content-Type": "text/html" });
//         res.end(data);
//       } catch (err) {
//         console.error(err.message);
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Internal server error.");
//       }
//     }
//     loadPage();
//   })
//   .listen(8080);
