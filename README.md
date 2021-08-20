## Node backend.

This is a simple boiler plate command line tool that will generate a node backend boiler plate with either javascript or typescript express server ready to run.

### Demo

<p align="center">
<img src="https://github.com/CrispenGari/nodejs-backend/blob/main/bandicam%202021-08-15%2012-41-16-900.jpg"/>
</p>

### Usage

To use this clt it is very easy all you have to do is to run the following command:

```
npx @crispengari/node-backend
```

### Generated folders and files.

```
- 📁 parent folder
    - 📁 src
        - server.[j|s]
    - 🗄 .gitignore
    - 🗄 README.md
    - 🗄 package.json
    - 🗄 tsconfig.json (if typescript is selected as a language)
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

**Note** You can also use the following command to start the typescript server with an single command:

```
yarn|npm start
```
