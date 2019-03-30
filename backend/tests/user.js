const user = require("../classes/user");

const users = [new user("thomas", "123456"), new user("jonathan", "123456"), new user("matthew", "123456")];
console.log(users.map(u => u.authenticate("thomas", "12345")).reduce((a, b) => a || b, false)); // false
console.log(users.map(u => u.authenticate("thomas", "123456")).reduce((a, b) => a || b, false)); // true