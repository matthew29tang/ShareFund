import React, { Component } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import './ETFComponent.css';
import Globals from "./globals";

export default class ETFComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    handleVote(e){  
        console.log(e.target.value);
        fetch(Globals.host + "vote", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
              fund: this.props.etfname,
              user: Globals.UID,
              vote: 1
            })
          });
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
                    <ToggleButton type="radio" name="radio" value="0">
                        Hold - {this.props.holdCount}
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="1">
                        Sell - {this.props.sellCount}
                    </ToggleButton>
                    </ButtonGroup>
                </div>

            {/*

            <div className="buyField"> 
            Buy - {this.props.buyCount}
            </div> 

            <div className="holdFiled"> 
            Hold - {this.props.holdCount}
            </div> 

            <div className="sellField"> 
            Sell - {this.props.sellCount}
            </div> 

            */ } 

            </div>
        );
    }
}

