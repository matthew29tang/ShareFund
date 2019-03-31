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

    setUsername(e) {
        this.setState({
            username: e.target.value
        });
        this.checkEnter(e);
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
        this.checkEnter(e);
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

    checkEnter(e) {
        if (e.keyCode === 13) {
            this.submit();
        }
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
                            <input type="text" onKeyUp={ e => this.setUsername(e) } />
                        </div>
                        <div className="inputgroup">
                            <label>Password</label>
                            <input type="password" onKeyUp={ e => this.setPassword(e) } />
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