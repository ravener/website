const fs = require("fs");
const { execSync } = require("child_process");

function watchCallback(event) {
  if(event !== "change") return;

  return execSync("node build.js --dev", {
    stdio: [0, 1, 2]
  });
}

fs.watch("src", watchCallback);
fs.watch("src/partials", watchCallback);
fs.watch("src/pages", watchCallback);

require("./dev.js");
