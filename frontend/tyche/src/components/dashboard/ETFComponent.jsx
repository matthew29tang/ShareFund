import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Request from '../../helpers/Request';

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleVote(vote){  
        Request.vote(this.props.uid, this.props.etfname, vote).then(
            res=>{
                console.log(res);
            });
        this.props.onVote();
    }

    render() {
        return (
            <div className="fund">
                <div className="name"> 
                    { this.props.etfname }
                </div> 
                <div className="stats"> 
                    <span>Shares - </span>{ this.props.quantity }
                    <br />
                    <span>Equity - </span>${ this.props.equity } 
                </div> 
                <div className="buttons">
                    <div className="button" onClick={ () => this.handleVote(1) }>
                        Buy
                        <span>{ this.props.buyCount }</span>
                    </div>
                    <div className="button" onClick={ () => this.handleVote(0) }>
                        Hold
                        <span>{ this.props.holdCount }</span>
                    </div>
                    <div className="button" onClick={ () => this.handleVote(-1) }>
                        Sell
                        <span>{ this.props.sellCount }</span>
                    </div>
                </div>

            {} 

            </div>
        );
    }
}
