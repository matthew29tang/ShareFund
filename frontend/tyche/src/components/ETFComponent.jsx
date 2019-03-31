import React, { Component } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    handleVote(e){  
        console.log(e.target.value);
        Request.vote(this.props.uid, this.props.etfname,e.target.value);
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
                    <ToggleButton type="radio" name="radio" onClick={(e) => this.handleVote(e)} value="-1">
                        Buy - {this.props.buyCount}
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" onClick={(e) => this.handleVote(e)} value="0">
                        Hold - {this.props.holdCount}
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" onClick={(e) => this.handleVote(e)} value="1">
                        Sell - {this.props.sellCount}
                    </ToggleButton>
                    </ButtonGroup>
                </div>

            {} 

            </div>
        );
    }
}

