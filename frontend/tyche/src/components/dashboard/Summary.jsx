import React from "react";

class Summary extends React.Component {
    getTotalEquity() {
        return this.props.stockData.reduce((a, b) => a + b.equity, 0);
    }

    render() {
        return (
            <div className="summary">
                ${ this.getTotalEquity() }
            </div>
        )
    }
}

export default Summary;