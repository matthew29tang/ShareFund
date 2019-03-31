import React from "react";

class Summary extends React.Component {
    getTotalEquity() {
        return this.props.stockData.reduce((a, b) => a + b.equity, 0);
    }

    render() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })
          
        return (
            <div className="summary">
                <div className="dateField">
                    {this.props.date.month}/{this.props.date.day}/{this.props.date.year}
                </div>
                { formatter.format(this.getTotalEquity()) }
            </div>
        )
    }
}

export default Summary;