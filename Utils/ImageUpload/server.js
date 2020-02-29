const fs = require("fs");
const express = require("express");
const app = express();
const formidabel = require("formidable");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

const ui = fs.readFileSync(__dirname + "/index.html").toString();
app.get("/", (req, res) => {
  res.send(ui);
});

app.post("/", (req, res) => {
  const prefixPath = "/public/images/";
  let filePath = "/images/";
  new formidabel.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      const randPath = file.path.split("_")[1] + "." + file.type.split("/")[1];
      file.path = __dirname + prefixPath + randPath;
      filePath += randPath;
    })
    .on("file", (name, file) => {
      console.log(filePath);
    });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Running in 3000");
});
