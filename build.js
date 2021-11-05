const fs = require("fs");
const path = require("path");

const md = require("markdown-it")({
  highlight: function(str, lang) {
    return `<pre class="hljs" style="padding: 0.3em"><code class="lang-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
  },
  breaks: true,
  html: true
});

md.use(require("markdown-it-anchor"), {
  permalink: true,
  permalinkBefore: false,
  permalinkSymbol: "🔗" /* '§' */
});

md.use(require("markdown-it-table-of-contents"));

// Determine if we are building for development.
const dev = process.argv.includes("--dev");

if (dev) console.log("Building for development mode.");

// Ensure public/ exists.
if (!fs.existsSync("public")) fs.mkdirSync("public");
if (!fs.existsSync("public/blog")) fs.mkdirSync("public/blog");

// All pages.
const files = fs.readdirSync(path.join("src", "pages"));
// Base template.
const template = fs.readFileSync(path.join("src", "template.html")).toString();

const title = (s) => s[0].toUpperCase() + s.slice(1);

for (const page of files) {
  // Used the async version here to allow files to be quickly built in parallel
  fs.readFile(path.join("src", "pages", page), (err, html) => {
    if (err) throw err;

    // Execute the template.
    const output = template
      // This is a simple {{include file}} directive and also cares to respect indents so the output is clean.
      .replace(/([ \t]+)?{{include (.+)}}/g, (_, spaces, file) => spaces +
        fs.readFileSync(path.join("src", "partials", file + ".html")).toString().split("\n").join("\n" + spaces))
      .replace(/{{title}}/g, page === "index.html" ? "Home" : title(path.parse(page).name))
      .replace(/([ \t]+)?{{body}}/g, (_, spaces) => spaces +
        html.toString().split("\n").join("\n" + spaces).trim())
      // {{prod <html>}} directives get commented out on development mode.
      .replace(/{{prod (.+)}}/g, (_, body) => dev ? `<!-- ${body} -->` : body);

    // Write the output.
    fs.writeFile(path.join("public", page), output, (err) => {
      if (err) throw err;
      console.log(`Built ${path.join("public", page)}`);
    });
  });
}

const blogTemplate = fs.readFileSync(path.join("src", "template-blog.html")).toString();

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Build the blog
const posts = fs.readdirSync("blog").map(post => ({
  file: post,
  title: post.slice(0, -3).split("-").slice(3).map(title).join(" "),
  date: {
    year: post.split("-")[0],
    month: post.split("-")[1],
    day: post.split("-")[2]
  }
}));

for (const post of posts) {
  fs.readFile(path.join("blog", post.file), (err, page) => {
    if (err) throw err;

    const html = md.render(page.toString());

    // You know the drill. Maybe I should put this in a function but it's not like I'm gonna write this everyday
    const output = blogTemplate
      .replace(/{{date}}/g, `${months[parseInt(post.date.month) - 1]} ${post.date.day}, ${post.date.year}`)
      .replace(/([ \t]+)?{{include (.+)}}/g, (_, spaces, file) => spaces +
        fs.readFileSync(path.join("src", "partials", file + ".html")).toString().split("\n").join("\n" + spaces))
      .replace(/{{title}}/g, post.title)
    // The indent part ruins the highlighted codeblocks, oh well.
    //.replace(/([ \t]+)?{{body}}/g, (_, spaces) => spaces +
    //   md.split("\n").join("\n" + spaces).trim())
      .replace(/{{body}}/g, html)
      .replace(/{{prod (.+)}}/g, (_, body) => dev ? `<!-- ${body} -->` : body);

    const filePath = path.join("public", "blog", post.file.replace(".md", ".html"));
    fs.writeFile(filePath, output, (err) => {
      if (err) throw err;
      console.log(`Built blog post ${filePath}`);
    });
  });
}
