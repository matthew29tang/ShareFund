import React from "react";
import Request from "../helpers/Request";
import Login from "./Login";
import Navbar from "./dashboard/Navbar";
import Summary from "./dashboard/Summary";
import Funds from "./dashboard/Funds";

import "../style.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: -1,
            stockData: [],
            date: { 
            } ,
            initialList: [],
            keyword: ""
        }
        this.onVote = this.onVote.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }
    onSearch(event) { 
        let updatedList = this.state.initialList;
        updatedList = updatedList.filter(function(item){
          return item.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({stockData: updatedList, keyword: event.target.value.toLowerCase() });
    }
    onVote() { 
        Request.getState().then(data => { 
            let index = 0;
            for ( let i = 0; i < data.users.length; i++ ) { 
                if (data.users[i].id === this.state.user) {
                     index = i; 
                }
            }
            let names = ["Vanguard Materials ETF", "Vanguard Financials ETF", "Vanguard Information Technology", 
            "Vanguard Healthcare ETF", "Vanguard Industrials ETF", "Vanguard Real Estate ETF", 
            "Vanguard Utilities ETF" ];
            let ETFList = Object.keys(data.funds).map((key,ind) => { 
                let buyCount  = data.funds[key].votes.buy; 
                let holdCount = data.funds[key].votes.hold; 
                let sellCount = data.funds[key].votes.sell; 

                let price = data.funds[key].price; 
                let quantity = data.funds[key].quantity; 
                let equity = quantity * price; 

                let voted = false; 
                if (data.users[index].currentVotes[key] != null) 
                    voted = true;

                return {
                    full_name: names[ind],
                    name: key,
                    quantity: quantity,
                    equity: equity,
                    buyCount: buyCount,
                    holdCount: holdCount,
                    sellCount: sellCount,
                    price: price,
                    checked: voted
                }
            }); 
            this.setState({stockData: ETFList, initialList: ETFList}); 
        });
    }


    componentDidMount() {
        setInterval(()=>{
        Request.getState().then(data => {
            
            let index = 0;
            for ( let i = 0; i < data.users.length; i++ ) { 
                if (data.users[i].id === this.state.user) {
                     index = i; 
                }
            }
            let names = ["Vanguard Materials ETF", "Vanguard Financials ETF", "Vanguard Information Technology", 
            "Vanguard Healthcare ETF", "Vanguard Industrials ETF", "Vanguard Real Estate ETF", 
            "Vanguard Utilities ETF" ];
            let ETFList = Object.keys(data.funds).map((key,ind) => { 
                let buyCount  = data.funds[key].votes.buy; 
                let holdCount = data.funds[key].votes.hold; 
                let sellCount = data.funds[key].votes.sell; 

                let price = data.funds[key].price; 
                let quantity = data.funds[key].quantity; 
                let equity = quantity * price; 

                let voted = false; 
                if (data.users[index].currentVotes[key] != null) 
                    voted = true;

                return {
                    full_name: names[ind],
                    name: key,
                    quantity: quantity,
                    equity: equity,
                    buyCount: buyCount,
                    holdCount: holdCount,
                    sellCount: sellCount,
                    price: price, 
                    checked: voted
                }
            }); 
            this.setState({date: data.date}); 
            this.setState({stockData: ETFList, initialList: ETFList}); 

            if (this.state.keyword !== "") { 
                let updatedList = this.state.initialList;
                let keyword = this.state.keyword;
                updatedList = updatedList.filter(function(item){
                    return item.name.toLowerCase().search(
                      keyword) !== -1;
                  });
                  this.setState({stockData: updatedList});
            }
        });

        }, 1000);
    }

    logout() {
        this.setState({
            user: -1
        });
    }
    
    setUser(user) {
        this.setState({
            user: user
        });
    }

    render() {


        if(this.state.user === -1) return (<Login setUser={ user => this.setUser(user) }></Login>);

        return (
            <div className="dashboard">
                <Navbar logout={ () => this.logout() } onSearch={this.onSearch}></Navbar>

                <Summary stockData={ this.state.stockData } date={this.state.date}></Summary>
                <Funds stockData={ this.state.stockData } user={ this.state.user } onVote={ () => this.onVote() }></Funds>
            </div>
        );
    }
}

export default Dashboard;