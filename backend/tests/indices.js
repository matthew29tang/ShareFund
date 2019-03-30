const indices = require("../classes/indices");

const obj = new indices().generateBlank(() => []);
console.log(obj);
Object.keys(obj).forEach((a, i) => obj[a].push(i));
console.log(obj);

const arr2 = new indices().generateBlank(() => null);
console.log(arr2);
console.log(arr2.map((val, i) => i));