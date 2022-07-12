## initialiseur

A boiler plate initializer for:

```shell
- electron application
- koa application
- express application
```

### Getting started

Run

```shell
npx initialiseur init <name>
# or when you are installed initialiseur globally on your computer
initialiseur init <name>
```

> Note that the `name` is optional. You can omit it if you want to create a boiler plate application with the same name as the current folder.

### Then

```shell
cd <app-name>

# yarn
yarn start

# npm
npm run start
```

If you want to start the server with typescript and hot reloading run the following commands in different terminals or command prompt

```shell
# yarn
yarn watch

# npm
npm run watch
```

b) `cmd` 2

```shell
# yarn
yarn dev

# npm
npm run dev
```

Or you can run a single command which was introduced in version `5.1.*` which is:

```shell
# yarn
yarn start:fast

# npm
npm run start:fast
```

All done **Happy hacking**.
