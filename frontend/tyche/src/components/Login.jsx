import React from "react";
import Request from "../helpers/Request";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
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
            if(data.id === -1) {
                this.setState({
                    error: "Your username and password do not match."
                });
            } else {
                this.setState({
                    error: ""
                });
                this.props.setUser(data.id);
            }
        });
    }

    render() {
        return (
            <div className="login">
                <div className="left"></div>
                <div className="right">
                    <div className="form">
                        <h2 className="title">Sign In</h2>
                        <div className="inputgroup">
                            <label>Username</label>
                            <input type="text" onChange={ e => this.setUsername(e.target.value) } />
                        </div>
                        <div className="inputgroup">
                            <label>Password</label>
                            <input type="password" onChange={ e => this.setPassword(e.target.value) } />
                        </div>
                        <div className="error">{ this.state.error }</div>
                        <input type="submit" value="Sign In" onClick={ () => this.submit() } />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;