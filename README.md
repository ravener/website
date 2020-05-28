# My Personal Website

Personal website, about me and all that stuff.

## Usage
Visit the site at [ravener.now.sh](https://ravener.now.sh)

For development: (Node.js needs to be installed)
```sh
$ npm run build
# Or for development mode.
$ npm run build -- --dev
```
I use plain HTML/CSS no frameworks at all. Just a manual templating to keep pages cleaner, the base template is at [src/template.html](src/template.html) and all pages are under [src/pages](src/pages) running the above command generates the static HTML under `public/` and can be hosted anywhere easily.

To serve the `public/` directory locally to view changes before pushing run `npm run dev` and visit `http://localhost:3000`

This website uses 0 npm dependencies, no templating engine, no js frameworks. Everything is beautifully handcrafted including the build system.

## License
Released under the [MIT License](LICENSE)
