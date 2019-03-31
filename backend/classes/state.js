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
            users: [new user("thomas", "123456"), new user("jonathan", "123456"), new user("matthew", "123456")],
            date: {
                day: 2,
                month: 5,
                year: 18
            }
        }
    }

    collect() {
        return this.state;
    }

    toJSON() {
        const funds = this.state.funds.map(fund => {
            return {
                votes: {
                    buy: this.state.users.filter(u => u.getCurrentVotes()[fund._key] && u.getCurrentVotes()[fund._key].vote === 1).length,
                    hold: this.state.users.filter(u => u.getCurrentVotes()[fund._key] && u.getCurrentVotes()[fund._key].vote === 0).length,
                    sell: this.state.users.filter(u => u.getCurrentVotes()[fund._key] && u.getCurrentVotes()[fund._key].vote === -1).length
                },
                price: fund.price,
                quantity: fund.quantity,
                date: this.state.date
            }
        });
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

    updateDate(day, month, year) {
        this.state.date['day'] = day;
        this.state.date['month'] = month;
        this.state.date['year'] = year;
        return this;
    }
}

module.exports = state;