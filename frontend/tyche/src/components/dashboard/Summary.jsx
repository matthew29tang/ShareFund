import React from "react";
import Chart from "./Chart";

class Summary extends React.Component {
    getTotalEquity() {
        return this.props.stockData.reduce((a, b) => a + b.equity, 0);
    }

    processHistory(history) {
        return Object.keys(history).map(h => {
            return history[h].map(p => {
                return {
                    value: p.price * p.quantity,
                    date: new Date(p.date.year, p.date.month - 1, p.date.day)
                }
            });
        }).reduce((a, b) => {
            return b.map((p, i) => {
                return {
                    value: p.value + a[i].value,
                    date: p.date
                }
            });
        }, new Array(history[Object.keys(history)[0]].length).fill({
            value: 0,
            date: null
        }));
    }

    render() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        console.log(this.processHistory(this.props.history));
          
        return (
            <div className="summary">
                <div className="dateField">
                    {this.props.date.month}/{this.props.date.day}/{this.props.date.year}
                </div>
                { formatter.format(this.getTotalEquity()) }
                <Chart data={ this.processHistory(this.props.history) } width={ 700 } height={ 300 } detailed={ true }></Chart>
            </div>
        )
    }
}

export default Summary;