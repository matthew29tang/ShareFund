import React from "react";
import Chart from "./Chart";

class ETFDetails extends React.Component {
    render() {
        console.log(this.props.history);
        return (
            <div class="funddetails">
                <div class="symbol">{ this.props.name}</div>
                <div class="name">{ this.props.fname }</div>
                <div class="price">{ this.props.price }</div>
                <Chart data={ this.props.history } width={ 500 } height={ 200 } detailed={ true }></Chart>
            </div>
        )
    }
}

export default ETFDetails;