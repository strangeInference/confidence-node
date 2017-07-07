import React, {Component} from "react";

class Pred extends Component {

  render() {
    return (
      <div>
        <p>{this.props.p.prediction}</p>
        <p>{this.props.p.prob}</p>
        <p>{String(this.props.p.outcome)}</p>
      </div>
    )
  }
}

export default Pred;
