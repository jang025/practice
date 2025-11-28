const express = require("express");
const app = express();
const userRoutes = require("./controllers/userController");

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
