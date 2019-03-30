import React, { Component } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="ETFComponent">

            <span className="ETFName"> 
            {this.props.etfname}
            </span> 


            <div className="quantityIndicator"> 

                {this.props.quantity}
                <br /> 
                {this.props.equity} 

            </div> 

            <div className="d-flex flex-column">

            <ButtonGroup toggle className="mt-3">
            <ToggleButton type="radio" name="radio" defaultChecked value="1">
            buy
            </ToggleButton>
            <ToggleButton type="radio" name="radio" value="2">
            Radio
            </ToggleButton>
            <ToggleButton type="radio" name="radio" value="3">
            Radio
            </ToggleButton>
            </ButtonGroup>
            </div>

            <div className="buyField"> 
            Buy - {this.props.buyCount}
            </div> 

            <div className="holdFiled"> 
            Hold - {this.props.holdCount}
            </div> 

            <div className="sellField"> 
            Sell - {this.props.sellCount}
            </div> 

            </div>
        );
    }
}

