import React from "react";
import ETFComponent from "./ETFComponent";

class Funds extends React.Component {
    render() {
        return (
            <div className="funds">
                { this.props.stockData.map((fund, i) => { 
                    return ( 
                    <ETFComponent etfname={fund.name} quantity={fund.quantity} 
                        equity={fund.equity} buyCount={fund.buyCount} 
                        holdCount={fund.holdCount} sellCount={fund.sellCount} 
                        uid={this.props.user} key={i} onVote={this.props.onVote} 
                        />);
                }) }
            </div>
        )
    }
}

export default Funds;