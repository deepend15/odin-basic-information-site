import http from "node:http";
import fs from "node:fs/promises";

http
  .createServer((req, res) => {
    async function loadPage() {
      try {
        let data;
        let code = 200;
        if (req.url === "/") {
          data = await fs.readFile("./index.html");
        } else if (req.url === "/about") {
          data = await fs.readFile("./about.html");
        } else if (req.url === "/contact-me") {
          data = await fs.readFile("./contact-me.html");
        } else {
          data = await fs.readFile("./404.html");
          code = 404;
        }
        res.writeHead(code, { "Content-Type": "text/html" });
        res.end(data);
      } catch (err) {
        console.error(err.message);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error.");
      }
    }
    loadPage();
  })
  .listen(8080);
