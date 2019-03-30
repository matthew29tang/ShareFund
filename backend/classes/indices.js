const data = require("../data.json");

class indices {

    constructor() {

    }
    generateBlank(fn) {
        const blank =  Object.keys(data).reduce((obj, key, i) => {
            obj[key] = fn(key, i);
            return obj;
        }, {});
        Object.defineProperty(blank, "map", {
            writable: false,
            value: callback => {
                return this.generateBlank((key, i) => callback(blank[key], i));
            }
        });
        Object.defineProperty(blank, "reduce", {
            writable: false,
            value: (callback, initial) => {
                Object.keys(blank).forEach((key, i) => {
                    initial = callback(initial, blank[key], i);
                });
                return initial;
            }
        });
        return blank;
    }
}

module.exports = indices;