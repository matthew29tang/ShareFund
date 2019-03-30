const indices = require("./indices");

class state {
    constructor() {
        this.state = new indices().generateBlank(() => []);
        Object.keys(this.state).forEach(index => {
            this.state[index] = {
                votes: {
                    buy: [],
                    hold: [],
                    sell: []
                },
                price: 0,
                quantity: 0
            };
        });
    }

    collect() {
        return this.state;
    }

    updateState(index, key, value) {
        this.state[index][key] = value;
        return this;
    }
}

module.exports = state;