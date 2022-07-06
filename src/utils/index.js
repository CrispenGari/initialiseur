const objJS = {
  name: "",
  version: "1.0.0",
  main: "server.js",
  author: "",
  description: "",
  license: "MIT",
  scripts: null,
  dependencies: null,
  keywords: [],
  devDependencies: null,
};
const objTS = {
  name: "",
  version: "1.0.0",
  main: "server.js",
  description: "",
  author: "",
  license: "MIT",
  keywords: [],
  scripts: null,
  dependencies: null,
  devDependencies: null,
};

// scripts for javascript
const electronJsScripts = {
  start: "electron src/main.js",
};

const expressJsScripts = {
  start: "node src/server.js",
  dev: "nodemon src/server.js",
};
const koaJsScripts = expressJsScripts;

// scripts for typescript
const electronTsScripts = {};

const expressTsScripts = {
  watch: "tsc -w",
  start: "ts-node src/server.ts",
  dev: "nodemon dist/server.js",
};
const koaTsScripts = expressTsScripts;

// dev-dependencies for javascript
const electronJsDevDependencies = { electron: "^19.0.7" };
const expressJsDevDependencies = { nodemon: "^2.0.12" };
const koaJsDevDependencies = { nodemon: "^2.0.12" };
// dev-dependencies for typescript

const electronTsDevDependencies = {};
const expressTsDevDependencies = {
  "ts-node": "^10.2.0",
  "ts-node-dev": "^1.1.8",
  typescript: "^4.3.5",
  "@types/cors": "^2.8.12",
  "@types/express": "^4.17.13",
  "@types/node": "^16.6.1",
  nodemon: "^2.0.12",
  "@types/node": "^17.0.8",
};
const koaTsDevDependencies = {
  "@types/koa": "^2.13.4",
  "@types/koa-router": "^7.4.4",
  "@types/node": "^17.0.8",
  "ts-node": "^10.2.0",
  "ts-node-dev": "^1.1.8",
  typescript: "^4.3.5",
  "@types/cors": "^2.8.12",
  nodemon: "^2.0.12",
};

// dependencies for javascript
const electronJsDependencies = {};
const expressJsDependencies = {
  cors: "^2.8.5",
  express: "^4.17.1",
  dotenv: "^10.0.0",
};
const koaJsDependencies = {
  koa: "^2.13.4",
  "koa-body": "^4.2.0",
  "koa-router": "^10.1.1",
  dotenv: "^10.0.0",
};
// dependencies for typescript
const electronTsDependencies = {};
const expressTsDependencies = {
  cors: "^2.8.5",
  dotenv: "^10.0.0",
  express: "^4.17.1",
};
const koaTsDependencies = {
  dotenv: "^11.0.0",
  jest: "^27.4.7",
  koa: "^2.13.4",
  "koa-body": "^4.2.0",
  "koa-router": "^10.1.1",
};

module.exports = {
  objJS,
  objTS,
  koaJsScripts,
  koaTsScripts,
  expressJsScripts,
  expressTsScripts,
  electronJsScripts,
  electronTsScripts,
  electronJsDevDependencies,
  electronTsDevDependencies,
  electronJsDependencies,
  electronTsDependencies,
  koaJsDevDependencies,
  koaTsDevDependencies,
  koaJsDependencies,
  koaTsDependencies,
  expressJsDevDependencies,
  expressTsDevDependencies,
  expressJsDependencies,
  expressTsDependencies,
};
