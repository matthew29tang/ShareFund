const routes = require("./routes");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;
//use cors 


var cors = require('cors');
const state = require("./classes/state");

const currentState = new state();
app.use(cors());


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app, currentState);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
