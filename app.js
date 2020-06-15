const express = require("express");
const routes = require("./routes/routes");
const app = express();

app.use(routes);
app.set("view engine", "ejs");

const SERVER_PORT = 5000;
app.listen(SERVER_PORT, () => { console.log(`Server started on Port ${SERVER_PORT}`)});