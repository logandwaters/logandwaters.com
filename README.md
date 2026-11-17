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

### Static health report

The build writes `health.json` after generating the site and fails if required pages or assets are missing. It is a build-time report, not a live check of the server. In Uptime Kuma, use a JSON Query monitor for `$.status` with the expected value `healthy`. Missing resources appear in `$.missing_pages` and `$.missing_assets`. Page counts include generated HTML files; asset counts include other generated files except the health report.

The service is the configured Astro site hostname, or the package name if no site URL is configured. The version is taken from `SITE_VERSION_REF`, `GITHUB_SHA`, or `VERCEL_GIT_COMMIT_SHA` when it is a hexadecimal commit SHA; otherwise it is `null`. For GitHub release events, `GITHUB_SHA` is ignored because it may not identify the checked-out release tag. The environment is selected from `DEPLOYMENT_ENV`, `VERCEL_ENV`, or `NODE_ENV` when set to `production`, `preview`, `development`, or `test`; it defaults to `production`.

Add this location inside the site's Nginx `server` block, using the existing site root:

```nginx
location = /health.json {
    types { application/json json; }
    default_type application/json;
    add_header Cache-Control "no-cache" always;
    try_files $uri =404;
}
```

Nginx `add_header` inheritance may require repeating any security headers configured at the server level in this location.

Deployments link to the release tag for published releases, or to the checked-out commit (displayed as its first six characters) for manually dispatched workflows. Local builds omit the version unless `SITE_VERSION` is set. A locally supplied version links to a release by default; set `SITE_VERSION_TYPE` to `commit` to link to a commit instead.

For example, in PowerShell:

```powershell
$env:SITE_VERSION = "v1.2.3"
npm run build
Remove-Item Env:SITE_VERSION
npm run preview
```