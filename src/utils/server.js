const express = require("express");
const cors = require("cors");

//
const app = express();
const PORT = 3001 || process.env.PORT;

// ------

app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    name: "backend",
    language: "typescript",
    message: "hello world!",
  });
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
