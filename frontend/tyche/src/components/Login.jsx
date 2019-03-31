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
            this.props.setUser(data.id);
        });
    }

    render() {
        return (
            <div className="form">
                <h2 className="title">Log In</h2>
                <div className="inputgroup">
                    <label>Username</label>
                    <input type="text" onChange={ e => this.setUsername(e.target.value) } />
                </div>
                <div className="inputgroup">
                    <label>Password</label>
                    <input type="password" onChange={ e => this.setPassword(e.target.value) } />
                </div>
                <input type="submit" onClick={ () => this.submit() } />
            </div>
        )
    }
}

export default Login;