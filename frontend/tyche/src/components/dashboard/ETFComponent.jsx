import React, { Component } from "react";
import Request from '../../helpers/Request';

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

            {} 

            </div>
        );
    }
}
