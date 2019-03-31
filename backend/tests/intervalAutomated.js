const interval = require("../interval")();

//Assumes state and users and vote are correct
const state = require("../classes/state");
const user = require("../classes/user");
const vote = require("../classes/vote");

console.log("Starting simulation...");
const s = new state();
interval.tick(s);
