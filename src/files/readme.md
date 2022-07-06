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
yarn start
# or
npm start
```

If typescript for hot reloading run the following commands in different terminals or command prompt

1. cmd 1

```shell
yarn watch

# or

npm watch
```

2. cmd 2

```shell
yarn dev

# or

npm dev
```

> Note that if you are running an electron application we only have a single command `start` for starting the application with either `npm` or `yarn`.

All done **Happy hacking**.
