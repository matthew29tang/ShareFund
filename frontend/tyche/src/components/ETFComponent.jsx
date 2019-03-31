import React, { Component } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Request from '../helpers/Request';

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    handleVote(e){  
        Request.vote(this.props.uid, this.props.etfname, e.target.value).then(
            res=>{
                console.log(res);
            });
        this.props.onVote();
    }

    render() {
        return (
            <div className="ETFComponent">
                <div className="ETFName"> 
                    {this.props.etfname}
                </div> 
                <div className="quantityIndicator"> 
                    {this.props.quantity}
                    <br /> 
                    {this.props.equity} 
                </div> 

                <div className="d-flex flex-column toggleGroup">

                <ButtonGroup toggle className="mt-3">
                    <Button onClick={(e) => this.handleVote(e)} value="1">
                        Buy - {this.props.buyCount}
                    </Button>
                    <Button onClick={(e) => this.handleVote(e)} value="0">
                        Hold - {this.props.holdCount}
                    </Button>
                    <Button onClick={(e) => this.handleVote(e)} value="-1">
                        Sell - {this.props.sellCount}
                    </Button>
                    </ButtonGroup>
                </div>

            {} 

            </div>
        );
    }
}

