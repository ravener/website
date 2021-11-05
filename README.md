# My Personal Website

Personal website, about me and all that stuff.

## Usage
Visit the site at [ravener.vercel.app](https://ravener.vercel.app)

For development: (Node.js needs to be installed)
```sh
# Install dependencies
$ npm install
# Build the files.
$ node build.js
# Or for a development build.
$ npm build.js --dev
```
I use plain HTML with [Bulma CSS](https://bulma.io) and a manual templating system I made to keep pages cleaner, the base template is at [src/template.html](src/template.html) and all pages are under [src/pages](src/pages) running the above command generates the static HTML under `public/` and can be hosted anywhere easily.

To serve the `public/` directory locally and view changes before pushing run `node dev.js` and visit `http://localhost:3000`

To watch for file changes as you edit run `node watch.js` It will start the same server from `dev.js` but in addition watches for file changes and rebuilds the files. It's not perfect but it is a very simple script that just works and does what I need.

The goal is to build a clean and polished site with a small size footprint so it loads very fast and also a simple development phase with no bloated build systems like webpack.

## License
Released under the [MIT License](LICENSE)
