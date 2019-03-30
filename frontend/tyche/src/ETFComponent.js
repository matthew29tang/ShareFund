import React, { Component } from "react";
import { Button } from "react-bootstrap";

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



      </div>
    );
  }
}

