![Header](public/assets/brand/readme-header.svg)

# The Personal Site of Logan Waters

The source for [logandwaters.com](https://logandwaters.com), my personal site and portfolio.

The site introduces my work, projects, interests, and background as I continue building my career in web development. It also serves as a place to experiment with web technologies, design, infrastructure, and the tools and practices I use in my own work.

## Architecture

The site is built with [Astro](https://astro.build/) and generated as static HTML at build time. Astro components provide the page structure, while custom CSS handles the visual design and small browser-side JavaScript provides interactive features such as the theme switcher and build time version tagging.

The site has no application server or database requirement at runtime. The generated files can be served directly by a standard web server or static hosting platform.

## Development

The project requires Node.js and npm.

Install the dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm run dev
```

To generate and preview the production build:

```sh
npm run build
npm run preview
```

Some content and site elements are generated at build time, so the production build is the best way to verify the final static output.

## Why the source is public

I've made the source code public because I like open development and believe personal projects can be useful references for other developers. The repository provides a look at how the site is structured, designed, built, and maintained.

The source is primarily intended as a reference and example of my work rather than as a reusable website template.

## License

The source code is publicly available for viewing and educational reference. No license is granted to copy, modify, redistribute, or reuse the source code or website design as a separate project.

Third-party dependencies, libraries, fonts, and other assets remain subject to their respective licenses.

*© 2026 Logan Waters. All rights reserved.*