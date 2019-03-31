const interval = require("../interval")();

//Assumes state and users and vote are correct
const state = require("../classes/state");
const user = require("../classes/user");
const vote = require("../classes/vote");

console.log("The day is " + interval.getDate().day);
interval.incrementDay();
console.log("The day is now " + interval.getDate().day);
interval.incrementDay();
interval.incrementDay();
interval.incrementDay();
interval.incrementDay();
console.log("The day is now " + interval.getDate().day);

const s = new state();
s.updateState("VGT", "price", 100);
s.updateState("VHT", "price", 200);
s.updateState("VFH", "price", 300);
s.updateState("VIS", "price", 400);
s.updateState("VAW", "price", 500);
s.updateState("VNQ", "price", 600);
s.updateState("VPU", "price", 700);

const efts = ['VAW', 'VFH', 'VGT', 'VHT', 'VIS', 'VNQ', 'VPU']
const users = s.state.users; //[new user("thomas", "123456"), new user("jonathan", "123456"), new user("matthew", "123456")];

for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[0].vote(efts[i], 1));
    s.state.funds[efts[i]].quantity = 100;
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[1].vote(efts[i], -1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[2].vote(efts[i], 1));
}

console.log(s.collect());
console.log("\n\n\n\n");
interval.updateState(s);
console.log(s.collect());

for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[0].vote(efts[i], -1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[1].vote(efts[i], -1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[2].vote(efts[i], -1));
}

interval.updateState(s);
console.log(s.collect());

for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[0].vote(efts[i], 1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[1].vote(efts[i], 1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[2].vote(efts[i], 1));
}

interval.updateState(s);
console.log(s.collect());

for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[0].vote(efts[i], 1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[1].vote(efts[i], 1));
}
for (i = 0; i < 7; i++) {
    s.state.funds[efts[i]].votes.push(users[2].vote(efts[i], 1));
}

interval.updateState(s);
console.log(s.collect());
console.log("Finished");