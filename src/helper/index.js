const {
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
} = require("../utils/index.js");

const getScriptObject = (boilerPlate, language) => {
  if (language === "javascript") {
    if (boilerPlate === "express") return expressJsScripts;
    if (boilerPlate === "electron") return electronJsScripts;
    if (boilerPlate === "koa") return koaJsScripts;
  } else {
    if (boilerPlate === "express") return expressTsScripts;
    if (boilerPlate === "electron") return electronTsScripts;
    if (boilerPlate === "koa") return koaTsScripts;
  }
};

const getEntryPoint = (boilerPlate, language) => {
  if (boilerPlate === "electron") {
    return language === "javascript" ? "main.js" : "main.ts";
  } else {
    return language === "javascript" ? "server.js" : "server.ts";
  }
};

const getDevDependencies = (boilerPlate, language) => {
  if (language === "javascript") {
    if (boilerPlate === "express") return expressJsDevDependencies;
    if (boilerPlate === "electron") return electronJsDevDependencies;
    if (boilerPlate === "koa") return koaJsDevDependencies;
  } else {
    if (boilerPlate === "express") return expressTsDevDependencies;
    if (boilerPlate === "electron") return electronTsDevDependencies;
    if (boilerPlate === "koa") return koaTsDevDependencies;
  }
};

const getDependencies = (boilerPlate, language) => {
  if (language === "javascript") {
    if (boilerPlate === "express") return expressJsDependencies;
    if (boilerPlate === "electron") return electronJsDependencies;
    if (boilerPlate === "koa") return koaJsDependencies;
  } else {
    if (boilerPlate === "express") return expressTsDependencies;
    if (boilerPlate === "electron") return electronTsDependencies;
    if (boilerPlate === "koa") return koaTsDependencies;
  }
};
module.exports = {
  getScriptObject,
  getEntryPoint,
  getDependencies,
  getDevDependencies,
};
