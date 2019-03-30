class vote {
    constructor(vote) {
        if(vote !== -1 && vote !== 0 && vote !== 1) throw new RangeError("Value of 'vote' must be either -1, 0, or 1.");
        this.vote = vote;
        this.weight = -1;
        this.executed = false;
    }

    execute() {

    }
}

module.exports = vote;