const state = require("../classes/state");

const s = new state();
console.log(s.collect());
s.updateState("VAW", "price", 4000);
console.log(s.collect());
s.updateState("VGT", "price", 5000);
console.log(s.collect());