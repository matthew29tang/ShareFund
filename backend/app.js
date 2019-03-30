const routes = require("./routes");

const express = require("express");
const app = express();
const port = 8080;

const state = require("./classes/state");

const currentState = new state();

routes(app, currentState);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))