import React, {Component} from "react";
import Pred from "./pred.js";

class PredList extends Component {

  mapSort() {
    let predictions = this.props.predictions;

    predictions = predictions.map((p, i) => {
      if (this.props.type === "pending" && p.outcome === null) {
        return (
          <Pred key={String(i)} p={p} index={i} setOutcome={this.props.setOutcome} />
        );
      }
      if (this.props.type === "past" && p.outcome !== null) {
        return (
          <Pred key={String(i)} p={p} index={i} />
        );
      }
    });
    predictions.sort((a, b) => {
      if (!a || !b) {
        return 0;
      }
      if (this.props.type === "pending") {
        return new Date(a.props.p.date_known) - new Date(b.props.p.date_known);
      } else {
        return new Date(b.props.p.updatedAt) - new Date(a.props.p.updatedAt);
      }
    });

    return predictions;
  }

  render() {
    
    // if (this.props.type === "pending") {
    //   predictions = predictions.filter((p) => {
    //     return p.outcome === null;
    //   });
    // } else {
    //   predictions = predictions.filter((p) => {
    //     return p.outcome !== null;
    //   });
    // }
    
    

    return (
      <div>{this.mapSort()}</div>
      );
  }
}
export default PredList;
