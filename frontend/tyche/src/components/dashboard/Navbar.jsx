import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <img className="logo" src="./logo.png" />
                <input type="text" className="search" onChange={this.props.onSearch} 
                placeholder="Search by symbol" />
                <div className="logout" onClick={ this.props.logout }>Sign Out</div>
            </div>
        )
    }
}

export default Navbar;