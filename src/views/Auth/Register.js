import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  registerUser = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  render() {
    const { name, email, password } = this.state;
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Rejestracja</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  value={name}
                  className="form-control col-md-8"
                  type="text"
                  placeholder="name:"
                  onChange={this.handleName}
                />
              </div>
              <div className="form-group">
                <input
                  value={email}
                  className="form-control col-md-8"
                  type="text"
                  placeholder="email:"
                  onChange={this.handleEmail}
                />
              </div>
              <div className="form-group">
                <input
                  value={password}
                  className="form-control col-md-8"
                  type="password"
                  placeholder="password:"
                  onChange={this.handlePassword}
                />
              </div>
              <button
                className="btn btn-secondary col-md-8 mb-2"
                onClick={this.registerUser}
              >
                login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default Register;
