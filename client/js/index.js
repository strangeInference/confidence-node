import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import App from "./app.js";
import Login from "./login.js";
import $ from "jquery";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      singedUp: false,
      predictions: []
    };

    this.handdleLogin = this.handdleLogin.bind(this);
    this.handdleLogout = this.handdleLogout.bind(this);
  }

  handdleLogin() {
    if (!this.state.loggedIn) {
      $.ajax({
        method: "GET",
        url: "/predictions",
        dataType: "json",
        cache: false,
        // success: (data) => {
        //   this.setState({
        //     predictions: data
        //   });
        //   console.log("getting predictions", data);
        // },
        // error: (xhr, status, err) => {
        //   console.error(this.props.url, status, err.toString());
        // }
    }).done((data) => {
      this.setState({
        predictions: data
      });
      console.log("getting predictions", data);
      this.setState({
        loggedIn: !this.state.loggedIn
      });
    })
    }
    // this.setState({
    //   loggedIn: !this.state.loggedIn
    // });
  }

  handdleLogout() {
    console.log("trying to logout")
    $.ajax({
      method: "PUT",
      url: "/logout",
    }).done((res) => {
      console.log("logged out")
      this.setState({
        loggedIn: false
      })
  })
    this.setState({
      loggedIn:false
    });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn && <button onClick={this.handdleLogout}>Logout</button>}
        {this.state.loggedIn && <App predictions={this.state.predictions}/>}
        {!this.state.loggedIn && <Login loginCallback={this.handdleLogin}/>}
        <button onClick={this.handdleLogin}>Toggle Login</button>
      </div>
    );
  }

}

render(<Index/>, document.getElementById('root'));
