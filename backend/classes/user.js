const indices = require("./indices");
const vote = require("./vote");

class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = Math.round(Math.random() * 100000);
        this.history = new indices().generateBlank(() => []);
        this.currentVotes = new indices().generateBlank(() => null);
    }

    authenticate(username, password) {
        return username === this.username && password === this.password;
    }

    vote(index, v) {
        this.currentVotes[index] = new vote(v);
    }

    _calculateAverageWeights(index) {
        return this.history[index].forEach(v => v.getWeight()).reduce((a, b) => a + b);
    }

    _calculateAveragePrice(index) {

    }

    calculateWeight(prices) { // Current price

    }

    getCurrentVotes() {
        return this.currentVotes;
    }

    executeVote(index, price, weight) {
        this.currentVotes[index].execute(price, weight);
        this.history[index].push(this.currentVotes[index]);
        this.currentVotes[index] = null;
    }
}

module.exports = user;