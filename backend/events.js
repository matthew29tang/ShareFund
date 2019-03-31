const getEvents = (state) => {
    const login = (req, res) => {
        const user = state.collect().users.find(u => {
            return u.authenticate(req.username, req.password)
        });
        res.send({
            id: user ? user.id : -1
        });
    }
    
    const vote = (req, res) => {
        const votes = state.collect().funds[req.fund].votes;
        const user = state.collect().users.find(u => u.id === req.user);
        if(!user.getCurrentVotes()[req.fund]) {
            votes.push(user.vote(req.fund, req.vote));
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
        res.send(state.toJSON());
    }

    const events = {
        login: login,
        vote: vote,
        getstate: getstate
    }

    return events;
}

module.exports = getEvents;