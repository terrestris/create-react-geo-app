# create-react-geo-app (CRGA)

[![Lint, typecheck, build, run and e2e test the CRGA](https://github.com/terrestris/create-react-geo-app/actions/workflows/full-check.yml/badge.svg)](https://github.com/terrestris/create-react-geo-app/actions/workflows/full-check.yml)

A command line interface to quickly create a [`react-geo`](https://github.com/terrestris/react-geo)
based web GIS application based on a [comprehensive template](https://github.com/terrestris/react-geo-client-template).
There is probably no easier way to get started with `react-geo` or to bootstrap an
application using it.

## tl;dr

```
npx @terrestris/create-react-geo-app my-react-geo-app
```

## Requirements

Requires [Node.js](https://nodejs.org/) and [npx](https://www.npmjs.com/package/npx)
or [npm](https://www.npmjs.com/), both usually come with Node.js.

## Usage without installation ⚡

```
npx @terrestris/create-react-geo-app my-react-geo-app
```

Creates a new `react-geo` application in the `my-react-geo-app`-folder. Perfectly fine
for one time usages.

## Global installation

### Installation 💾

Once:

```
npm install -g @terrestris/create-react-geo-app
```

You can then use the new `create-react-geo-app` command, e.g.:

```
create-react-geo-app my-react-geo-app
```

The result is the same as the `tl;dr` example from above, but the `npm install`-way is
recommended if you regularily use the `create-react-geo-app` program. Pick one way or
the other, there is not much you can do wrong here.


### Update 🚀

```
npm update -g @terrestris/create-react-geo-app
```

### Uninstalling 😔

```
npm uninstall -g @terrestris/create-react-geo-app
```

## Syntax

In a directory of your choice, say `/code`:

```
create-react-geo-app my-react-geo-app [options]
```

Will result in a folder `/code/my-react-geo-app`, which contains a nice react-geo
application. You can use this as the starting pont for your specific project needs.


## Options

* `-V`, `--version` Output the version number
* `-g`, `--git-init` Whether to init an empty git repository or not (default: `false`)
* `-t`, `--tag` The `react-geo-client-template` version/tag, wil use the latest version if
not provided
* `-h`, `--help` Display help for command


## Developing


### Installing dependencies

To get the dependencies, run

```
npm install
```

in the project root.

### Running a development version

If you want to use your variant of the program (probably with changed source taking
effect), run

```
npm link
```

`create-react-geo-app` anywhere will now point to your locally built program.

### Typechecking

Easy:

```
npm run typecheck
```

### Linting and testing

For linting only,

```
npm run lint
```

is your friend. This will also be called when running `npm test`.

We currently have no tests for the CLI, but would be happy to receive PRs in that
direction.

## Contributing

In short: yes, please contribute as you see fit 😊, we're looking forward to your input.

Be bold and open PRs and issues for anything that bugs you or for all the ideas you want
to share. We'd be happy to help you make your first steps or even bigger changes.
