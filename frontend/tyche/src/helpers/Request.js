class Request {
    static get host() {
        return "http://localhost:8080/";
    }

    static getState() {
        return fetch(Request.host + "getstate", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(results => {
            return results.json();
        });
    }

    static login(username, password) {
        return fetch(Request.host + "login", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(results => {
            return results.json();
        });
    }

    static vote(user, fund, vote) {
        return fetch(Request.host + "vote", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: user,
                fund: fund,
                vote: vote
            })
        })
        .then(results => {
            return results.json();
        });
    }
}

export default Request;