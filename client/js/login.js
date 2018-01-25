import React, {Component} from "react";
import $ from "jquery";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      signlog: "Signup",
      other: "Login"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSignLog = this.toggleSignLog.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  createUser() {
    $.ajax({
      method: "POST",
      url: "/signup",
      data: {
        username: this.state.username,
        password: this.state.password
      },
      // succsess: (res) => {
      //   if (true) {
      //     this.props.loginCallback();
      //   }
      // }
    }).done((res) => {
      if (res.valid) {
        this.props.loginCallback();
      }
    });
  }

  loginUser() {
    $.ajax({
      method: "PUT",
      xhrFields: {withCredentials: true},
      url: "/login",
      data: {
        username: this.state.username,
        password: this.state.password
      },
      // async: false,
      // succsess: (res) => {
      //   console.log("succsess");
      //   if (res.valid) {
      //     this.props.loginCallback();
      //   }
      // },
      // error: (err) => {
      //   console.log("error", err);
      // }
    }).done((res) => {
      console.log("succsess: ", res);
      if (res.valid){
        this.props.loginCallback();
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.signlog === "Signup") {
      this.createUser();
    } else {
      this.loginUser();
    }
  }

  toggleSignLog(e) {
    e.preventDefault();
    this.setState({
      signlog: this.state.other,
      other: this.state.signlog
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSignLog}>{this.state.other}</button>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.signlog}</h1>
          <div>
            <input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div>
            <input name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">{this.state.signlog}</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;
