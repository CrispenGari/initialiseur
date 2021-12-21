## initialiseur.

This is a package that can be installed on your computer to easily initialize `node.js` backend server. This backend server is an `express` application with `cors` configured that is ready to run on a configured default port `3001` which can be modified in code. This package can initialize boiler plate code for a basic express application for the following packages:

1. javascript
2. typescript `(default)`

> Note that this package is coming from `@crispengari/node-backend`.

### Getting started

First you need to install the node `initialiseur` globally by running the following command:

1. Using `npm`

```shell
npm install -g initialiseur
```

2. Using `yarn`

```
yarn global add initialiseur
```

### Usage

To initialize a new `node.js` backend project you run the following command:

```
initialiseur init <package|backend name>
```

> Note that you can initialize the `node.js` backend project without installing `initialiseur` globally by the use of `npx`:

```shell
npx initialiseur init <package|backend name>
```

- `<package|backend name>` is optional if note specified `initialiseur` will use the `root` directory of the project as the default package name, which can be altered as well.

### Generated folders and files.

```
- 📁 parent folder
    - 📁 src
        - 📁 routes
            - index.[j|s]
        - server.[j|s]
    - 🗄 .gitignore
    - 🗄 README.md
    - 🗄 package.json
    - 🗄 LISENSE (MIT)
    - 🗄 tsconfig.json (if typescript is selected as a language)
```

### Available commands in `initialiseur`

1. help
   This shows all available commands of `initialiseur` package

```shell
initialiseur -h

# or
initialiseur --help
```

2. version
   This shows the currently installed version of `initialiseur` package:

```shell
initialiseur -v
# or
initialiseur --version
```

3. init

This initializes a new `initialiseur` project:

```shell

initialiseur init <package|backend name>
# Or
initialiseur init
```

### Staring the server.

**Note:** Starting the server is different if you are using typescript or javascript.

1. With `JavaScript`:

```
yarn|npm dev
```

**Note**- You can also use the following command to start the server but with no hot reloading:

```
yarn|npm start
```

2. With `TypeScript`:

With `ts` you have to open two command the one that will `watch` for file changes and the other one that will run the compiled javascript code:
a) `cmd` 1

```
yarn|npm watch
```

b) `cmd` 2

```
yarn|npm dev
```

c). Or you can use a single command which:
This command is built basically uses [ts-node-dev](https://www.npmjs.com/package/ts-node-dev). You can configure flags based on your preferences

```
yarn|npm start:fast
```

**Note** You can also use the following command to start the typescript server with an single command:

```
yarn|npm start
```

### From `@crispengari/node-backend` to `initialiseur`

`Initialiseur` was initially `@crispengari/node-backend` so you can initialize the `node.js` backend by running executing `@crispengari/node-backend` using `npx`.

### Executing specific versions

You can be able to execute the specific versions of `@crispengari/node-backend` using the node package executer (npx)

1. Running the node package executer `npx`

```shell
npx @crispengari/node-backend@<version>

# example (make sure the version exists before running this)
npx @crispengari/node-backend@<1.3.2>
```

### Available working versions

### `v1`

1. `@crispengari/node-backend@1.3.2`
2. `@crispengari/node-backend@1.3.6`
3. `@crispengari/node-backend@1.3.7`
4. `@crispengari/node-backend@1.3.8`

### `v2`

1. `@crispengari/node-backend@2.0.1`

### `v3`

1. `initialiseur@3.0.0`
1. `initialiseur@3.0.1`

### Why `initialiseur`?

`initialiseur` is a name that I got from google translation for the name `initializer`. I created this package so that developers can create their backend applications with typescript or javascript without running into a headache of creating files and installing basic packages like `express`.
