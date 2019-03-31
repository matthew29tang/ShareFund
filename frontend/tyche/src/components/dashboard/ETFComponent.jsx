import React, { Component } from "react";
import Request from '../../helpers/Request';
import Chart from "./Chart";

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

    handleVote(vote){  
        if (!this.props.voted){
            Request.vote(this.props.uid, this.props.etfname, vote).then(
                res=>{
                    console.log(res);
                });
            this.props.onVote();
        }
    }

    processHistory(history) {
        return history.map(h => {
            return {
                value: h.quantity * h.price,
                date: new Date(h.date.year, h.date.month - 1, h.date.day)
            }
        });
    }

    render() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })
        
            let addon = " button";
            if(this.props.voted ) 
                addon = "disabl";

            let btnClassNm = addon;

        return (
            <div className="fund">
                <div className="name"> 
                    { this.props.etfname }
                    <div className="fullName"> { this.props.fname }</div>
                   
                </div> 
                <div className="stats"> 
                    <span>Shares - </span>{ this.props.quantity }
                    <br />
                    <span>Equity - </span>{ formatter.format(this.props.equity) } 
                    <br />
                    <span>Price - </span>{ formatter.format(this.props.price)} 
                </div> 
                <div className="buttons">
                    <div className={btnClassNm} onClick={ () => this.handleVote(1) }>
                        Buy
                        <span>{ this.props.buyCount }</span>
                    </div>
                    <div className={btnClassNm} onClick={ () => this.handleVote(0) }>
                        Hold
                        <span>{ this.props.holdCount }</span>
                    </div>
                    <div className={btnClassNm} onClick={ () => this.handleVote(-1) }>
                        Sell
                        <span>{ this.props.sellCount }</span>
                    </div>
                </div>
                <div className="etfchart">
                    <Chart data={ this.processHistory(this.props.history) } width={ 120 } height={ 60 } detailed={ false }></Chart>
                </div>
            </div>
        );
    }
}
