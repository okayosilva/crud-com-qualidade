const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("crud");

function create(content) {
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

create("Hello World");
