import React from "react";
import Request from "../helpers/Request";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    setUsername(_) {
        this.setState({
            username: _
        });
    }

    setPassword(_) {
        this.setState({
            password: _
        })
    }

    submit() {
        Request.login(this.state.username, this.state.password).then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="form">
                <h2 className="title">Log In</h2>
                <div className="inputgroup">
                    <label>Username</label>
                    <input type="text" onChange={ val => this.setUsername(val) } />
                </div>
                <div className="inputgroup">
                    <label>Password</label>
                    <input type="password" onChange={ val => this.setPassword(val) } />
                </div>
                <input type="submit" onClick={ () => this.submit() } />
            </div>
        )
    }
}