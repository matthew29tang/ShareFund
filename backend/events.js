const users = require("./users");

const getEvents = (state) => {
    const login = (req, res) => {
        const user = users.find(user => {
            return user.username === req.username && user.password === req.password;
        });
        res.send({
            id: user ? user.id : -1
        });
    }
    
    const vote = (req, res) => {
        const votes = state[req.fund].votes;
        const findVote = voteType => voteType.findIndex(user => user === req.user) !== -1;
        if(!findVote(votes.buy) && !findVote(votes.hold) && !findVotes(votes.sell)) {
            switch(req.vote) {
                case -1: 
                    votes.sell.push(req.user);
                    break;
                case 0:
                    votes.hold.push(req.user);
                    break;
                case 1:
                    votes.buy.push(req.user);
                    break;
            }
            res.send({
                status: true
            });
        } else {
            res.send({
                status: false
            });
        }
    }
    
    const getstate = (req, res) => {
        res.send(state);
    }

    const events = {
        login: login,
        vote: vote,
        getstate: getstate
    }
}

module.exports = getEvents;