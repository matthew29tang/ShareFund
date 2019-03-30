const dayLength = 60 * 1000;
const day = 2;
const month = 4;
const year = 2018;
const date = 0;
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const tick = () => {
    setInterval(function () {
        incrementDay();
        updateState();
    }, dayLength);
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

const getStockPrices = (data) => {
    const prices = {}
    for (eft in data) {
        prices[eft] = eft[date].price;
    }
    return prices;
}

const updateState = (state) => {
    Object.keys(state).forEach(index => {
        const total = 0;
        const price = getStockPrices(data)[index];
        for (user in state.users) {
            const vote = user.getCurrentVotes()[index];
            const weight =  user.calculateWeight(getStockPrices(data));
            user.executeVote(index, price, weight);
            total += vote.collect()['vote'] * weight;
        }
        const action = total / state.users.length;
        state.updateState(index, 'price', price);
        state.updateState(index, 'quantity', Math.round(action * state["quantity"]));
    });
    
}