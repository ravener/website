const fs = require("fs");
const path = require("path");

// Determine if we are building for development.
const dev = process.argv.includes("--dev");

if(dev) console.log("Building for development mode.");

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
      // Unfortunately cannot use async api here, well not a big deal our site isn't that bloated to take ages.
      // This is a simple {{include file}} directive and also cares to respect indents so the output is clean.
      .replace(/([ \t]+)?{{include (.+)}}/g, (_, spaces, file) => spaces +
        fs.readFileSync(path.join("src", "partials", file + ".html")).toString().split("\n").join("\n" + spaces))
      .replace(/([ \t]+)?{{body}}/g, (_, spaces) => spaces +
        html.toString().split("\n").join("\n" + spaces).trim())
      // {{prod <html>}} directives get commented out on development mode.
      .replace(/{{prod (.+)}}/g, (_, body) => dev ? `<!-- ${body} -->` : body);

    // Write the output.
    fs.writeFile(path.join("public", page), output, (err) => {
      if(err) throw err;
      console.log(`Built ${path.join("public", page)}`);
    });
  });
}
