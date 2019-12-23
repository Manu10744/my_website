const express = require("express");
const routes = require("./routes/routes");
const app = express();

app.use(routes);
app.set("view engine", "ejs");

// Specifying and setting the port to listen to
const serverPort = 5055;
app.listen(serverPort, () => { console.log(`Server started on Port ${serverPort}`)});