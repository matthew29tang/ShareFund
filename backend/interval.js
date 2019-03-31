const interval = () => {
    const dayLength = 1 * 1000;
    let day = 2;
    let month = 4;
    let year = 2018;
    let date = 0;
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const data = require("./data.json");

    const tick = (state) => {
        setInterval(function () {
            getTestVotes(state);
            incrementDay();
            updateState(state);
            printSim(state);
        }, dayLength);
    }

    const printSim = (state) => {
        const d = state.collect().funds;
        for (eft in d) {
            console.log(eft +  " price: " + d[eft].price + " \tquantity: " + d[eft].quantity + " \tequity: " + Math.round(d[eft].price * d[eft].quantity));
        }
    }

    const getTestVotes = (s) => {
        const efts = ['VAW', 'VFH', 'VGT', 'VHT', 'VIS', 'VNQ', 'VPU']
        const users = s.state.users; 

        for (i = 0; i < 7; i++) {
            s.state.funds[efts[i]].votes.push(users[0].vote(efts[i], randInt()));
        }
        for (i = 0; i < 7; i++) {
            s.state.funds[efts[i]].votes.push(users[1].vote(efts[i], randInt()));
        }
        for (i = 0; i < 7; i++) {
            s.state.funds[efts[i]].votes.push(users[2].vote(efts[i], randInt()));
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
    }

    const getStockPrices = () => {
        const prices = {}
        for (eft in data) {
            prices[eft] = data[eft][date].price;
        }
        return prices;
    }

    const updateState = (state) => {
        const restart = 50;
        let userWeights = [];
        for (person in state.state.users) {
            user = state.state.users[person];
            userWeights.push(user.calculateWeight(getStockPrices()));
        }
        console.log("User weights: " + userWeights);
        Object.keys(state.state.funds).forEach(index => {
            let total = 0;
            let totalWeight = 0;
            const price = getStockPrices()[index];
            for (person in state.state.users) {
                user = state.state.users[person];
                const vote = user.getCurrentVotes()[index];
                const weight =  userWeights[person];
                user.executeVote(index, price, weight);
                total += vote.collect().vote * weight;
                totalWeight += weight;
            }
            const action = Math.round((total / totalWeight + 1) * state.state.funds[index].quantity);
            if (state.state.funds[index].quantity === 0) state.updateState(index, 'quantity', restart);
            else if (action < 0) state.updateState(index, 'quantity', 0);
            else state.updateState(index, 'quantity', action);
            state.updateState(index, 'price', price);
            state.state.funds[index].votes = [];
        });   
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