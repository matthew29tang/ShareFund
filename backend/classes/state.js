const indices = require("./indices");
const user = require("./user");

class state {
    constructor() {
        const funds = new indices().generateBlank(() => []);
        Object.keys(funds).forEach(index => {
            funds[index] = {
                votes: [],
                price: 0,
                quantity: 0
            };
        });
        this.state = {
            funds: funds,
            users: [new user("thomas", "123456"), new user("jonathan", "123456"), new user("matthew", "123456")]
        }
    }

    collect() {
        const funds = this.state.funds.map(fund => {
            return {
                votes: fund.votes.map(v => v.collect()),
                price: fund.price,
                quantity: fund.quantity
            }
        })
        const users = this.state.users.map(u => u.collect());
        return {
            funds: funds,
            users: users
        }
    }

    updateState(index, key, value) {
        this.state.funds[index][key] = value;
        return this;
    }
}

module.exports = state;