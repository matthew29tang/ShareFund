import React from "react";

class ChartControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 7
        }
    }

    select(val) {
        this.setState({
            selected: val
        });
        this.props.onChange(val);
    }

    render() {
        const selected = this.state.selected;
        return (
            <div className="chartcontrols" style={ {display: this.props.hidden ? "none" : "block"} }>
                <div className={ selected === 7 ? "button current" : "button" } onClick={ () => this.select(7) }>7D</div>
                <div className={ selected === 30 ? "button current" : "button" } onClick={ () => this.select(30) }>1M</div>
                <div className={ selected === 90 ? "button current" : "button" } onClick={ () => this.select(90) }>3M</div>
                <div className={ selected === 365 ? "button current" : "button" } onClick={ () => this.select(365) }>1Y</div>
                <div className={ selected === -1 ? "button current" : "button" } onClick={ () => this.select(-1) }>All Time</div>
            </div>
        )
    }
}

export default ChartControls;