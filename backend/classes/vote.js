class vote {
    constructor(vote) {
        if(vote !== -1 && vote !== 0 && vote !== 1) throw new RangeError("Value of 'vote' must be either -1, 0, or 1.");
        this.vote = vote;
        this.weight = -1;
        this.price = -1;
        this.executed = false;
    }

    execute(price, weight) {
        this.price = price;
        this.weight = weight;
        this.executed = true;
    }

    getWeight() {
        if(this.weight === -1) throw new EvalError("Vote must be executed before calculating weight.");
        return this.weight * this.vote;
    }

    collect() {
        return {
            vote: this.vote,
            weight: this.weight,
            price: this.price,
            executed: this.executed
        }
    }
}

module.exports = vote;