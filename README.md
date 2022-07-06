## initialiseur

This is a package that can be installed on your computer to easily initialize `node.js`node applications boiler plates such as:

```shell
- express
- koa
- electron
```

<img src="/images/cover.jpg" alt="cover" width="100%"/>

### Express Application

This backend server is an `express` application with `cors` configured that is ready to run on a configured default port `3001` which can be modified in code. This package can initialize boiler plate code for a basic express application for the following languages:

1. javascript
2. typescript `(default)`

Generated files for an `express` boiler plate:

```shell

Generating Basic Files(🌼) and Folders(📁)
  📁  src
     📁  routes
       🌼 index.ts
     🌼 server.ts
  🌼 .gitignore
  🌼 .env
  🌼 package.json
  🌼 tsconfig.json
```

### Koa Application

This backend server is an `koa` that is ready to run on a configured default port `3001` which can be modified in code. This package can initialize boiler plate code for a basic express application for the following languages:

1. javascript
2. typescript `(default)`

Generated files for an `koa` boiler plate:

```shell
Generating Basic Files(🌼) and Folders(📁)
  📁  src
     📁  routes
        📁  hello
           🌼 index.ts
     🌼 server.ts
  🌼 .gitignore
  🌼 .env
  🌼 package.json
  🌼 tsconfig.json
```

### Electron

This is skeleton electron application that is ready and running. All you have to do it to change the code according to what you want your application to do. The current version `5.0.*` is currently having one language initialization for an electron application which is:

1. `javascript`

Generated files for an `electron` boiler plate:

```shell
Generating Basic Files(🌼) and Folders(📁)
  📁  src
     📁  public
        🌼 index.html
     📁  scripts
        🌼 index.js
        🌼 preload.js
     📁  styles
        🌼 index.css
     🌼 main.js
  🌼 .gitignore
  🌼 README.md
  🌼 LICENSE
  🌼 .env
  🌼 package.json
```

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

To initialize a new `node` boiler plate application you run the following command:

```
initialiseur init <name>
```

> Note that you can initialize the `node.js` backend project without installing `initialiseur` globally by the use of `npx`:

```shell
npx initialiseur init <name>
```

- `<name>` is optional if note specified `initialiseur` will use the `root` directory of the project as the default package name, which can be altered as well.

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

initialiseur init <name>
# Or
initialiseur init
```

### Starting the apps.

**Note:** Starting the server is different if you are using `typescript` or `javascript` and if you are using `electron`, `koa` or `express`.

1. With `JavaScript`:

```shell
yarn|npm start
```

> The above command start a application for both `electron`, `koa` and `express`. The `electron` application is currently starting with one command which is the `start`.

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

> The above commands can only be run when you are either running a typescript application for either `koa` or `express`.

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
2. `initialiseur@3.0.1`
3. `initialiseur@3.0.2`

### What's new in `initialiseur@4.*.*`?

- In this version developers are allowed to choose licenses templates from the available ones during backend initialization.
- Developers can also select which additional optional files they want to add in their project during initialization.

### What is new in `initialiseur@5.*.*`?

- In this version developers are now able to select the application they want to initialize between:
  - express application
  - electron application
  - koa application
- Developers still have choice to choose the programming language to be used among:
  - javascript
  - typescript

* The language choices are currently working for the following applcations:
  - koa application
  - express application

### Why `initialiseur`?

`initialiseur` is a name that I got from google translation english to french for the name `initializer`. I created this package so that developers can create their backend applications with typescript or javascript without running into a headache of creating files and installing basic packages like `express`.
