# Abdelaziz Mahmoud (@abdelaziz321)

Personal website and technical blog: <https://abdelaziz321.github.io>.

Built with Nuxt 2 and Nuxt Content. Articles are written in Markdown in
[`content/articles`](./content/articles).

## Run locally

Use Node.js 20 and Yarn 1:

```sh
yarn install
yarn dev
```

Generate the static site in `dist/`:

```sh
yarn generate
```

## Deploy

The GitHub Actions workflow builds and deploys the site to GitHub Pages whenever
changes are pushed to `master`. In the repository settings, open **Settings →
Pages** and select the `gh-pages` branch with the `/ (root)` folder as the
publishing source. The workflow publishes the generated `dist/` site to that
branch.
