const routes = (app, state) => {
    const events = require("./events")(state);

    app.post("/login", (req, res) => events.login(req, res, state));
    app.post("/vote", (req, res) => events.vote(req, res, state));
    app.post("/getstate", (req, res) => events.login(req, res, state));
}

module.exports = routes;