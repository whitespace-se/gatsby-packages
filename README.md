# Whitespace’s Gatsby Packages

This is the monorepo for our Gatsby packages

## Gatsby themes

All packages are inside the `/packages` directory

### `@whitespace/gatsby-theme-wordpress-basic`

A Gatsby theme for a basic setup of Wordpress with GraphQL which handles the
sourcing from Wordpress and provides some basic components and layout.

## Gatsby plugins

### `@whitespace/gatsby-plugin-i18next`

Adds [`react-i18next`](https://react.i18next.com/) and the ability to define
translations via YAML files.

### `@whitespace/gatsby-plugin-page-wrapper`

Adds a shadowable page wrapper component to allow plugins and themes to wrap in
reverse order.

### `@whitespace/gatsby-plugin-search`

Adds a framework for search and archive pages.

### `@whitespace/gatsby-plugin-matomo`

A Gatsby plugin for support of Matomo.

## Examples

The `/examples` directory contains demo apps and submodules linking to Gatsby
starters.

## Contributing

If you want to make a pull request, fork the repo and create a branch based on
`main` but the name must start with `feature/`. Commit messages must follow
[Conventional Commits](https://www.conventionalcommits.org/). Publishing is done
via [Lerna](https://lerna.js.org/).
