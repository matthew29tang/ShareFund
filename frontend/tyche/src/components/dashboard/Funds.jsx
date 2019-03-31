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
                        price={fund.price} voted={fund.checked} fname={fund.full_name} history={this.props.history[fund.name]} openDialog={this.props.openDialog}
                        />);
                }) }
            </div>
        )
    }
}

export default Funds;