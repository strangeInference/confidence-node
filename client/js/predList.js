import React, {Component} from "react";
import Pred from "./pred.js";

class PredList extends Component {

  render() {
    let predictions = this.props.predictions;
    if (this.props.type === "pending") {
      predictions = predictions.filter((p) => {
        return p.pending;
      });
    } else {
      predictions = predictions.filter((p) => {
        return !p.pending;
      });
    }
    predictions = predictions.map((p) => {
      return (
        <Pred p={p} />
        );
    })

    return (
      <div>{predictions}</div>
      );
  }
}
export default PredList;
