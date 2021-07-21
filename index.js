const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url_img = path.join(__dirname, "public/slides", "");
  let arr_img_url = [];
  fs.readdirSync(url_img).forEach((file) => {
    arr_img_url.push(file);
  });

  let dots_html = `${new Array(Math.round(arr_img_url.length))
    .fill(1)
    .map(
      (el, i) =>
        `<div class="r-wrapper"><input type="radio" name="dot" id='${
          i + 1
        }'/></div>`
    )
    .join("")}`;

  let slider_html = `<ul>${arr_img_url
    .map(
      (element, i) =>
        `<li><img src='${"slides/" + element}' 
        'alt='slider_img' id='${i + 1}''></li>>`
    )
    .join("")}</ul>`;

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/"
      ? "index.html"
      : req.url === "/pomidoro"
      ? "pomidoro.html"
      : req.url === "/calculator"
      ? "/calculator"
      : req.url === "/game"
      ? "game.html"
      : req.url === "/weather"
      ? "weather.html"
      : req.url
  );

  const ext = path.extname(filePath);
  let contentType = "text/html";

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".img":
      contentType = "	image/jpeg";
      break;
    default:
      contentType = "text/html";
  }

  if (!ext) {
    filePath += ".html";
  }

  fs.readFile(filePath, (err, content) => {
    if (req.url === "/var_HTML") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
      });
      res.end(slider_html);
    } else if (req.url === "/var_DOTS") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
      });
      res.end(dots_html);
    } else if (err) {
      fs.readFile(path.join(__dirname, "public", "error.html"), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error");
        } else {
          res.writeHead(200, {
            "Content-Type": contentType,
          });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});
