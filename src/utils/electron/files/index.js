const { ipcRenderer } = require("electron");

console.log("Hello world from the renderer.");

window.document.querySelector("#btn").addEventListener("click", () => {
  ipcRenderer.send("message", {
    msg: "Hello Main from Renderer",
  });
  ipcRenderer.on("reply", (e, args) => {
    console.log(args);
  });
});
