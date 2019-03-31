import React from "react";

class Dialog extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }
    
        return (
            <div className="backdrop" className="backdrop">
            <div className="modal" className="dialog">
                {this.props.children}
                <div className="close" onClick={this.props.onClose}>&times;</div>
            </div>
            </div>
        );
    }
}

export default Dialog;