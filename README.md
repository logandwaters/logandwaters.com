# The Personal Site of Logan Waters

This is the repository for the personal website of Logan Waters, built with Astro and generated as a static site.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The static site is generated in `dist/`. Serve it locally to preview the production build:

```sh
npm run build
npm run preview
```

Open the URL printed by Astro (normally `http://localhost:4321/`). Opening `dist/index.html` directly as a file does not serve the site's root-relative assets correctly.

Deployments link to the release tag for published releases, or to the checked-out commit (displayed as its first six characters) for manually dispatched workflows. Local builds omit the version unless `SITE_VERSION` is set. A locally supplied version links to a release by default; set `SITE_VERSION_TYPE` to `commit` to link to a commit instead.

For example, in PowerShell:

```powershell
$env:SITE_VERSION = "v1.2.3"
npm run build
Remove-Item Env:SITE_VERSION
npm run preview
```