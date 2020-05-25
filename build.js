const fs = require("fs");
const path = require("path");

// Ensure public/ exists.
if(!fs.existsSync("public")) fs.mkdirSync("public");

// All pages.
const files = fs.readdirSync(path.join("src", "pages"));
// Base template.
const template = fs.readFileSync(path.join("src", "template.html")).toString();

const title = (s) => s[0].toUpperCase() + s.slice(1);

for(const page of files) {
  // Used the async version here to allow files to be quickly built in parallel
  fs.readFile(path.join("src", "pages", page), (err, html) => {
    if(err) throw err;

    // Execute the template.
    const output = template
      .replace(/{{title}}/g, page === "index.html" ? "Home" : title(path.parse(page).name))
      .replace(/{{body}}/g, html.toString());

    // Write the output.
    fs.writeFile(path.join("public", page), output, (err) => {
      if(err) throw err;
      console.log(`Built ${path.join("public", page)}`);
    });
  });
}
