const data = require("../data.json");

class indices {
    constructor() {

    }

    generateBlank(fn) {
        return Object.keys(data).reduce((obj, key) => {
            obj[key] = fn(key);
            return obj;
        }, {});
    }
}

module.exports = indices;