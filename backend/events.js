const getEvents = (state) => {
    const _findUserById = id => {
        return state.collect().users.find(u => u.id === id);
    }

    const login = (req, res) => {
        const user = state.collect().users.find(u => u.authenticate(req.username, req.password));
        res.send({
            id: user ? user.id : -1
        });
    }
    
    const vote = (req, res) => {
        const votes = state[req.fund].votes;
        const findVote = voteType => voteType.findIndex(user => user === req.user) !== -1;
        if(!findVote(votes.buy) && !findVote(votes.hold) && !findVotes(votes.sell)) {
            votes.push(_findUserById(req.user).vote(req.fund, req.vote));
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
        res.send(state.collect());
    }

    const events = {
        login: login,
        vote: vote,
        getstate: getstate
    }
}

module.exports = getEvents;