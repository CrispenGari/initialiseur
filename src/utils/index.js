const objJS = {
  name: "",
  version: "1.0.0",
  main: "server.js",
  author: "",
  description: "",
  license: "MIT",
  scripts: {
    start: "node src/server.js",
    dev: "nodemon src/server.js",
  },
  dependencies: {
    cors: "^2.8.5",
    express: "^4.17.1",
    dotenv: "^10.0.0",
  },
  keywords: [],
  devDependencies: {
    nodemon: "^2.0.12",
  },
};
const objTS = {
  name: "",
  version: "1.0.0",
  main: "server.js",
  description: "",
  author: "",
  license: "MIT",
  keywords: [],
  scripts: {
    watch: "tsc -w",
    start: "ts-node src/server.ts",
    dev: "nodemon dist/server.js",
    "start:fast": "ts-node-dev --respawn src/server.ts",
  },
  dependencies: {
    cors: "^2.8.5",
    express: "^4.17.1",
    "ts-node": "^10.2.0",
    typescript: "^4.3.5",
    "ts-node-dev": "^1.1.8",
    dotenv: "^10.0.0",
  },
  devDependencies: {
    "@types/node": "^16.6.1",
    nodemon: "^2.0.12",
    "@types/express": "^4.17.13",
    "@types/cors": "^2.8.12",
  },
};

module.exports = { objJS, objTS };
