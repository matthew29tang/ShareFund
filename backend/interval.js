const dayLength = 60 * 1000;
const day = 2;
const month = 4;
const year = 2018;
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

setInterval(function () {
    incrementDay();
    updateState();
}, dayLength);

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
}

const updateState = (state, fund) => {
    const direction = state[fund][buy] + state[fund][sell];
    const total = state[fund][buy] + state[fund][hold] + state[fund][sell];
    const action = direction / total;
}