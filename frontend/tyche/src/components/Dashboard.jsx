import React from "react";
import Request from "../helpers/Request";
import Login from "./Login";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: -1,
            stockData: []
        }
    }

    componentDidMount() {
        Request.getState().then(data => { 
            let ETFList = Object.keys(data.funds).map(key => { 
                let buyCount  = data.funds[key].votes.buy; 
                let holdCount = data.funds[key].votes.hold; 
                let sellCount = data.funds[key].votes.sell; 

                let price = data.funds[key].price; 
                let quantity = data.funds[key].quantity; 
                let equity = quantity * price; 

                return {
                    name: key,
                    quantity: quantity,
                    equity: equity,
                    buyCount: buyCount,
                    holdCount: holdCount,
                    sellCount: sellCount
                }
            }); 
            this.setState({stockData: ETFList}); 
        });
    }

    setUser(user) {
        this.setState({
            user: user
        });
    }

    render() {
        if(this.state.user === -1) return (<Login setUser={ user => this.setUser(user) }></Login>);
        return (<div></div>);
    }
}

export default Dashboard;