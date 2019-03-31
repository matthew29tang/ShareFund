const user = require("./classes/user");
const interval = () => {
    const dayLength = 1 * 8000;
    let day = 2;
    let month = 5;
    let year = 2018;
    let date = 23;
    let aiDate = 1;
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const data = require("./data.json");
    const ai = require("./ai.json");
    const useAI = true;
    console.log("Each simulation day will take " + dayLength / 1000 + " seconds in real time.");

    const tick = (state) => {
        genUsers(state);
        setInterval(function () {
            incrementDay();
            getTestVotes(state);
            updateState(state);
            //console.log(state);
            printSim(state);
        }, dayLength);
    }

    const printSim = (state) => {
        const d = state.collect().funds;
        for (eft in d) {
            console.log(eft + " price: " + d[eft].price + " \tquantity: " + d[eft].quantity + " \tequity: " + Math.round(d[eft].price * d[eft].quantity));
        }
    }

    const genUsers = (state) => {
        //state.state.users = []
        for (i = 1; i <= 7; i++) {
            state.state.users.push(new user("Random " + i, 123456));
        }
        if (useAI) state.state.users.push(new user("AI", 1337));
    }

    const getTestVotes = (s) => {
        const efts = ['VAW', 'VFH', 'VGT', 'VHT', 'VIS', 'VNQ', 'VPU']
        let users = s.state.users;
        users = users.slice(3); //Remove the real users from giving them test votes
        for (u in users) {
            for (i = 0; i < 7; i++) {
                s.state.funds[efts[i]].votes.push(users[u].vote(efts[i], randInt()));
            }
        }
        if (useAI) {
            for (i = 0; i < 7; i++) {
                let diff = 0;
                if (ai[efts[i]][aiDate] != null) {
                    diff = ai[efts[i]][aiDate].price - ai[efts[i]][aiDate - 1].price;
                }
                let decision = 1;
                if (diff < 0) {
                    decision = -1;
                } else if (diff == 0) {
                    decision = 0;
                }
                s.state.funds[efts[i]].votes.push(users[users.length - 1].vote(efts[i], decision));
            }
        }
    }

    const randInt = () => {
        return Math.floor(Math.random() * 3 - 1);
    }

    const incrementDay = () => {
        day += 1;
        if (day > monthLengths[month]) {
            day = 1;
            month += 1;
        }
        if (month > 12) {
            month = 1;
            year += 1;
        }
        date += 1;
        aiDate += 1;
    }

    const getStockPrices = () => {
        const prices = {}
        for (eft in data) {
            if (data[eft][date] == null) prices[eft] = 100;
            else prices[eft] = data[eft][date].price;
        }
        return prices;
    }

    const updateState = (state) => {
        const RESTART_QUANT = 50;
        let userWeights = [];
        for (person in state.state.users) {
            let user = state.state.users[person];
            userWeights.push(user.calculateWeight(getStockPrices()));
        }
        Object.keys(state.state.funds).forEach(index => {
            let total = 0;
            let totalWeight = 0;
            const price = getStockPrices()[index];
            for (person in state.state.users) {
                let user = state.state.users[person];
                const vote = user.getCurrentVotes()[index];
                const weight = userWeights[person];
                user.executeVote(index, price, weight);
                if (vote === null) total += 0;
                else total += vote.collect().vote * weight;
                totalWeight += weight;
            }
            const action = Math.round((total / totalWeight + 1) * state.state.funds[index].quantity);
            if (state.state.funds[index].quantity === 0) state.updateState(index, 'quantity', RESTART_QUANT);
            else if (action < 0) state.updateState(index, 'quantity', 0);
            else state.updateState(index, 'quantity', action);
            state.updateState(index, 'price', price);
            state.state.funds[index].votes = [];
            state.addHistory(index, {
                price: price,
                quantity: Math.max(action, 0),
                date: {
                    day: day,
                    month: month,
                    year: year
                }
            })
        });
        let s = "";
        userWeights.map(w => s += (Math.round(w * 100) / 100) + "  ");
        state.updateDate(day, month, year);
        console.log(s);
    }

    const getDate = () => {
        const datePackage = {
            day: day,
            month: month,
            year: year,
            date: date
        }
        return datePackage;
    }

    const interval = {
        updateState: updateState,
        tick: tick,
        incrementDay: incrementDay,
        getDate: getDate
    }
    return interval;
}

module.exports = interval;