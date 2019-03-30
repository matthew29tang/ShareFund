const indices = require("./indices");
const vote = require("./vote");

class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = Math.round(Math.random() * 100000);
        this.history = new indices().generateBlank(() => []);
        this.currentVote = new indices().generateBlank(() => null);
    }

    authenticate(username, password) {
        return username === this.username && password === this.password;
    }

    vote(index, v) {
        this.currentVote[index] = new vote(v);
    }

    calculateAverageWeights(index) {
        return this.history[index].forEach(v => v.getWeight()).reduce((a, b) => a + b);
    }

    calculateWeight() {

    }

    getCurrentVotes() {
        return this.currentVote;
    }

    executeVote(index) {
        this.history[index].push(this.currentVote[index]);
        this.currentVote[index] = null;
    }
}

module.exports = user;