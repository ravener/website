const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const file = path.join("public", (req.url === "/" ? "index.html" : req.url.slice(1)));
  const ext = path.extname(file);

  fs.readFile(file, (err, file) => {
    if(err) {
      console.log(err);
      res.statusCode = 500;
      res.end("Internal Server Error.");
      return
    }
    
    let contentType;
    // Basic content type mapping, extend this as we need more types.
    switch(ext) {
      case ".html":
        contentType = "text/html; charset=UTF-8";
        break;
      case ".js":
        contentType = "application/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
    }

    if(contentType) res.setHeader("Content-Type", contentType);

    res.setHeader("Content-Length", file.length);

    // Since this is for development, disable browser cache.
    res.setHeader("Cache-Control", "no-store");

    res.end(file);
  });
});

server.listen(3000, (err) => {
  if(err) throw err;
  console.log("> Ready on http://localhost:3000");
});
