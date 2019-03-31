const interval = require("../interval")();

//Assumes state and users and vote are correct
const state = require("../classes/state");
const user = require("../classes/user");
const vote = require("../classes/vote");

console.log("Starting simulation...");
const s = new state();
s.updateState("VGT", "price", 100);
s.updateState("VHT", "price", 200);
s.updateState("VFH", "price", 300);
s.updateState("VIS", "price", 400);
s.updateState("VAW", "price", 500);
s.updateState("VNQ", "price", 600);
s.updateState("VPU", "price", 700);

interval.tick(s);
