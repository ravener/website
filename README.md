# My Personal Website

Personal website, about me and all that stuff.

## Usage
Visit the site at [ravener.now.sh](https://ravener.now.sh)

For development: (Node.js needs to be installed)
```sh
$ node build.js
# Or for a development build.
$ npm build.js --dev
```
I use plain HTML/CSS no frameworks at all. Just a manual templating system I made to keep pages cleaner, the base template is at [src/template.html](src/template.html) and all pages are under [src/pages](src/pages) running the above command generates the static HTML under `public/` and can be hosted anywhere easily.

To serve the `public/` directory locally to view changes before pushing run `node dev.js` and visit `http://localhost:3000`

To watch for file changes as you edit run `node watch.js` It will start the same server from `dev.js` but in addition to watching for file changes and rebuilding the files. It's not perfect but it is a very simple script that just works and does what I need.

This website uses 0 npm dependencies, no templating engine, no js frameworks. Everything is beautifully handcrafted including the build system.

## License
Released under the [MIT License](LICENSE)
